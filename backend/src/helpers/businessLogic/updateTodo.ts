import { TodoItem } from "../../models/TodoItem";
import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { TodosAccess } from '../dataLayerLogic/todosAccess';

const todosAccess = new TodosAccess();

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest): Promise<TodoItem> {
    return await todosAccess.updateTodo(userId, todoId, updatedTodo);
}