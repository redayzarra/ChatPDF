import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT!,
});

export const getPinecone = () => pinecone;

export async function loadS3IntoPinecone(fileKey: string) {
  // Get the PDF => download and read from PDF
  

}