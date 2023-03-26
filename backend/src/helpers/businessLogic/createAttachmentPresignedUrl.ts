
import { TodosAccess } from "../dataLayerLogic/todosAccess";
import { AttachmentUtils } from "../fileStorageLogic/attachmentUtils";



const todosAccess = new TodosAccess();

const attachmentUtils = new AttachmentUtils();

export async function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {
    await todosAccess.updateAttachmentUrl(todoId, userId); // Update Todo attachment URL

    return await attachmentUtils.createAttachmentPresignedUrl(todoId);
}