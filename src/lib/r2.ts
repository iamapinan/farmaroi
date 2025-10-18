import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "https://603cdeb5c9b9c8faedcdec45863bb3b1.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "5682a17b2985c0d93486071efaefa330",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "813ad423d799ef35ec9dd729926848c3de9c3507f8df50375c30b58a8f407c70",
  },
});

export async function uploadToR2(file: File, folder: string = "uploads"): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  
  await r2.send(
    new PutObjectCommand({
      Bucket: "farmaroi",
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const publicUrl = `${process.env.R2_PUBLIC_URL || "https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev"}/${filename}`;
  return publicUrl;
}

export { r2 };

