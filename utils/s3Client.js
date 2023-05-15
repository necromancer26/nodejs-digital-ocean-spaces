
import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'

dotenv.config();
export const s3Client = new S3Client({
    endpoint: `https://${process.env.DO_ENDPOINT}`, // Find your endpoint in the control panel (e.g. sfo1.digitaloceanspaces.com), under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: `${process.env.DO_REGION}`, // (e.g. us-east-1, frankfurt-01). Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
    accessKeyId: `${process.env.DO_ACCESS_KEY}`, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: `${process.env.DO_SECRET_KEY}` // Secret access key defined through an environment variable.
    }
});