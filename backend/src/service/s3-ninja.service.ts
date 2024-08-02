import { PutBucketCorsCommand, S3Client } from "@aws-sdk/client-s3";
import logger from "../config/logger";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { resolveKey } from "../helpers/resolve-key";

//variables

const BUCKET_URL = `${process.env.S3_NINJA_ENDPOINT}/${process.env.S3_NINJA_BUCKET_NAME}`;

//check if the required environment variables are set

if (
  !process.env.S3_NINJA_ACCESS_KEY_ID ||
  !process.env.S3_NINJA_SECRET_KEY_ID ||
  !process.env.S3_NINJA_REGION ||
  !process.env.S3_NINJA_BUCKET_NAME
) {
  throw new Error(
    "Missing required environment variables for AWS configuration"
  );
}

//create S3 client

const client = new S3Client({
  endpoint: process.env.S3_NINJA_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_NINJA_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_NINJA_SECRET_KEY_ID,
  },
  region: process.env.S3_NINJA_REGION,
});

//ensure S3 bucket CORS rules

client
  .send(
    new PutBucketCorsCommand({
      Bucket: process.env.S3_NINJA_BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [{ AllowedOrigins: ["*"], AllowedMethods: ["GET"] }],
      },
    })
  )
  .then((res) => {
    logger.info("ensured s3 bucket CORS rules", res);
  })
  .catch((err) => logger.error("failed to ensure s3 bucket CORS rules", err));

//function to upload a file to S3

export async function putUri(
  uri: string,
  {
    key = undefined,
    prefix = undefined,
    postfix = undefined,
  }: {
    key?: string;
    prefix?: string;
    postfix?: string;
  } = {}
): Promise<{
  url: string;
  size: number;
  type: string;
}> {
  key = resolveKey(key, prefix, postfix);
  const uriMatch = uri.match(/^data:(.+?);(base64),(.+)/);

  if (!uriMatch) throw { error: "malformed_uri" };

  const [, ContentType, encoding, data] = uriMatch;
  const buffer = Buffer.from(data, "base64");

  try {
    await client.send(
      new PutObjectCommand({
        ACL: "public-read",
        Bucket: process.env.S3_NINJA_BUCKET_NAME!,
        Key: key,
        ContentLength: buffer.length,
        Body: buffer,
        ContentType,
      })
    );
    return {
      url: `${BUCKET_URL}/${key}`,
      size: buffer.length,
      type: ContentType,
    };
  } catch (e) {
    console.log("Error in putUri", e);
    throw { error: e };
  }
}
