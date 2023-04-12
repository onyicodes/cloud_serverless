import { TodoItem } from "../../models/TodoItem";
import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { createLogger } from "../../utils/logger";
import { TodosAccess } from '../dataLayerLogic/todosAccess';

const todosAccess = new TodosAccess();
const logger = createLogger('businessLogic-updateTodo')

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest): Promise<TodoItem> {
    logger.info(`Updating todo ${todoId}`);
    return await todosAccess.updateTodo(userId, todoId, updatedTodo);
}