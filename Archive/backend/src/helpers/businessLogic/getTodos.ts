import { TodosAccess } from '../dataLayerLogic/todosAccess';
import { TodoItem } from '../../models/TodoItem';
import { createLogger } from '../../utils/logger';

const todosAccess = new TodosAccess();
const logger = createLogger('businessLogic-getTodos')

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info(`Getting todos`);
    return await todosAccess.getTodosForUSer(userId);
}