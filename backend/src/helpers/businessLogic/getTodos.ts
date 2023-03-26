import { TodosAccess } from '../dataLayerLogic/todosAccess';
import { TodoItem } from '../../models/TodoItem';

const todosAccess = new TodosAccess();

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    return await todosAccess.getTodosForUSer(userId);
}