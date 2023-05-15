import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Client.js";
import * as dotenv from "dotenv";

dotenv.config();
// S3 api implementation
// this function gets the file, path on S3 bucket, and the bucket name and will return the link of the file once it's uploaded
export async function uploadFileToS3(file, key) {
  const params = {
    Bucket: `${process.env.DO_BUCKET}`,
    ACL: 'public-read', //specify permissions "private" "public-read" "public-read-write" "authenticated-read" "aws-exec-read" ""bucket-owner-read" "bucket-owner-full-control"
    Key: key, // key is the desired path of the file in the digital ocean space example "folder/files.txt"
    Body: file.data,
    ContentType: file.mimetype,
  };
  try {
    const Data = await s3Client.send(new PutObjectCommand(params));
    if (!Data || Data === undefined)
      throw new Error("Failed to upload file");
    const link = `${process.env.DO_BUCKET}.${process.env.DO_ENDPOINT}/${key}`;
    return link;
  } catch (err) {
    console.error(`Error uploading file to S3: ${err}`);
    throw err;
  }
}
// this function
export async function deleteFileFromS3(link) {
  try {
    const key = link.replace(
      `https://${process.env.DO_BUCKET}.${process.env.DO_ENDPOINT}/`,
      ""
    );
    const params = { Bucket: process.env.DO_BUCKET, Key: key };
    await s3Client.send(new DeleteObjectCommand(params));
    console.log("Deleting file on S3:", key);
    return;
  } catch (err) {
    console.error(`Error deleting file from S3: ${err}`);
    throw err;
  }
}
export async function getFileFromS3(link) {
  try {
    const key = link.replace(
      `https://${process.env.DO_BUCKET}.${process.env.DO_ENDPOINT}/`,
      ""
    );
    const params = { Bucket: process.env.DO_BUCKET, Key: key };
    const Data = await s3Client.send(new GetObjectCommand(params));
    return Data;
  } catch (err) {
    console.error(`Error getting file from S3: ${err}`);
    throw err;
  }
}
