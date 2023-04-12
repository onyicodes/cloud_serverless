
import { createLogger } from "../../utils/logger";
import { TodosAccess } from "../dataLayerLogic/todosAccess";
import { AttachmentUtils } from "../fileStorageLogic/attachmentUtils";



const todosAccess = new TodosAccess();
const logger = createLogger('businessLogic-createArrachementPresignedUrl')
const attachmentUtils = new AttachmentUtils();

export async function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {
    logger.info(`Updating attachmentUrl for todo: ${todoId}`);
    await todosAccess.updateAttachmentUrl(todoId, userId); // Update Todo attachment URL
    logger.info(`Creating presigned attachmentUrl for todo: ${todoId}`);
    return await attachmentUtils.createAttachmentPresignedUrl(todoId);
}