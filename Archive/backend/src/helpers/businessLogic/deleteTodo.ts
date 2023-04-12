import { TodoItem } from "../../models/TodoItem";
import { createLogger } from "../../utils/logger";
import { TodosAccess } from '../dataLayerLogic/todosAccess';

const todosAccess = new TodosAccess();
const logger = createLogger('businessLogic-deleteTodo')

export async function deleteTodo(userId: string, todoId: string): Promise<TodoItem> {
    logger.info(`Deleting todo ${todoId}`);
    return await todosAccess.deleteTodo(userId, todoId);
}