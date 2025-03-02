import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

function getClient(): S3Client {
    return new S3Client({
        ...(process.env.S3_ENDPOINT ?
            {
                endpoint: process.env.S3_ENDPOINT,
                apiVersion: "s3v4",
                forcePathStyle: true
            } : {}),
        region: process.env.S3_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_ID!,
            secretAccessKey: process.env.S3_ACCESS_SECRET!,
        }
    });
}

async function getFileSignedUrl(url: string): Promise<string> {
    try {
        const client = getClient();
        const toRemove = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/`;
        const params = {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: url?.replace(toRemove, ''),
        };
        const command = new GetObjectCommand(params);
        return await getSignedUrl(client, command, {expiresIn: 60 * 3});
    } catch (e) {
        console.error(e);
        return '';
    }
}

export default {
    getClient,
    getFileSignedUrl,
}
