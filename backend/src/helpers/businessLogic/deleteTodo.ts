import { TodoItem } from "../../models/TodoItem";
import { TodosAccess } from '../dataLayerLogic/todosAccess';

const todosAccess = new TodosAccess();
export async function deleteTodo(userId: string, todoId: string): Promise<TodoItem> {
    return await todosAccess.deleteTodo(userId, todoId);
}