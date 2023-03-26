import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import * as uuid from 'uuid'
import { TodoItem } from '../../models/TodoItem';
import { TodosAccess } from '../dataLayerLogic/todosAccess';
import { createLogger } from '../../utils/logger';

const todosAccess = new TodosAccess();
const logger = createLogger('businessLogic-createTodo')

export async function createTodo(userId: string, todo: CreateTodoRequest): Promise<TodoItem> {
    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();
    const done = false;
   try{
    return await todosAccess.createTodo({
        userId: userId,
        todoId: todoId,
        createdAt: createdAt,
        done: done,
        name: todo.name,
        dueDate: todo.dueDate
    })
    
   } catch(e){
    logger.info(`An error occurred ${e} creating todo for user ${todoId}`);
   }
    
}