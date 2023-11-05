import AWS from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.AWS_SECRET_ACCESS_KEY,
    });
  } catch (error) {}
}
