import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../../utils/logger'
import { TodoItem } from '../../models/TodoItem'
import { TodoUpdate } from '../../models/TodoUpdate'

const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)


const logger = createLogger('TodosAccess')

export class TodosAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todosTableName = process.env.TODOS_TABLE,
        private readonly attachmentS3Bucket = process.env.ATTACHMENT_S3_BUCKET
    ) {}

    async createTodo(todo: TodoItem): Promise<TodoItem> {
        logger.info(`Creating todo new ${todo.todoId}`);

        await this.docClient.put({
            TableName: this.todosTableName,
            Item: todo
        }).promise()
        console.log(`details of todo created: ${todo}`);
        return todo;
    }

    async getTodosForUSer(userId: string): Promise<TodoItem[]> {
        logger.info(`Fetching todos for user ${userId}`);

        const result =  await this.docClient.query({
            TableName: this.todosTableName,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": userId
            }}).promise();

        logger.info(`Completed query request for user ${userId} with result ${result}`);
        const items = result.Items
        return items as TodoItem[];
    }

    async updateTodo(userId: string, todoId: string, updatedTodo: TodoUpdate): Promise<TodoItem> {
        logger.info(`Updating todo content ${todoId}`);

        let params = {
            TableName: this.todosTableName,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: "set #name = :name, #dueDate = :dueDate, #done = :done",
            ExpressionAttributeNames: {
                "#name": "name",
                "#dueDate": "dueDate",
                "#done": "done",
            },
            ExpressionAttributeValues: {
                ":name": updatedTodo.name,
                ":dueDate": updatedTodo.dueDate,
                ":done": updatedTodo.done,
            },
            ReturnValues: "ALL_NEW"
        }
        const result =  await this.docClient.update(params).promise();
        const item = result.Attributes;
        return item as TodoItem;
    }

    async updateAttachmentUrl(todoId: string, userId: string): Promise<TodoItem>{

        console.log('Updating attachment url')
    
        const attachmentUrl: string = `https://${this.attachmentS3Bucket}.s3.amazonaws.com/${todoId}`
    
        const params = {
            TableName: this.todosTableName,
            Key: {
                "userId": userId,
                "todoId": todoId
            },
            UpdateExpression: "set #attachmentUrl = :attachmentUrl",
            ExpressionAttributeNames: {
                "#attachmentUrl": "attachmentUrl"
            },
            ExpressionAttributeValues: {
                ":attachmentUrl": attachmentUrl
            },
            ReturnValues: "ALL_NEW"
        }
    
        const result = await this.docClient.update(params).promise()
        const item = result.Attributes
        return item as TodoItem
    }

    async deleteTodo(userId: string, todoId: string): Promise<TodoItem> {
        logger.info(`Deleting todo ${todoId}`);

        
        const result =  await this.docClient.delete({
            TableName: this.todosTableName,
            Key: {
                userId,
                todoId
            }
        }).promise();
        const item = result.Attributes;
        return item as TodoItem;
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}