import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { getEmbeddings } from "./embeddings";
import { downloadFromS3 } from "./s3-server";
import md5 from "md5";

export const getPineconeClient = () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // Get the PDF => download and read from PDF
  console.log("Downloading S3 into file system");
  const file_name = await downloadFromS3(fileKey);

  if (!file_name) {
    throw new Error("Could not download from S3.");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  // Split and segment the PDF
  const documents = await Promise.all(pages.map(prepareDocument));

  // Vectorize
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {};
  } catch (error) {
    console.log("Error embedding documents", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str)).slice(0, bytes);
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;

  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}
