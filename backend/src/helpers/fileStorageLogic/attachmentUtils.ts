import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
export class AttachmentUtils {
    constructor(
        private readonly s3: AWS.S3 = createS3Client(),
        private readonly attachmentS3Bucket = process.env.ATTACHMENT_S3_BUCKET,
        private readonly s3SignedUrlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)
    ) {}

    async createAttachmentPresignedUrl(todoId: string): Promise<string>{
        const params = {
            Bucket: this.attachmentS3Bucket,
            Key: todoId,
            Expires: this.s3SignedUrlExpiration
        }
        return this.s3.getSignedUrl('putObject', params)
    }

}


function createS3Client() {
    return new XAWS.S3({
        signatureVersion: "v4",
    })
}
