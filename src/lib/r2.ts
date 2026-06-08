import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

  return `/media/${filename}`;
}

export async function deleteFromR2(url: string): Promise<void> {
  try {
    const publicUrlPrefix = process.env.R2_PUBLIC_URL || "https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev";
    let key = url;
    
    if (url.startsWith(publicUrlPrefix)) {
      key = url.replace(publicUrlPrefix, "");
    } else if (url.startsWith("/media/")) {
      key = url.replace("/media/", "");
    } else if (url.startsWith("media/")) {
      key = url.replace("media/", "");
    } else {
      try {
        const parsed = new URL(url);
        key = parsed.pathname.substring(1);
      } catch {
        key = url;
      }
    }

    if (key.startsWith("/")) {
      key = key.substring(1);
    }

    await r2.send(
      new DeleteObjectCommand({
        Bucket: "farmaroi",
        Key: key,
      })
    );
  } catch (error) {
    console.error("Failed to delete from R2:", error);
  }
}

export { r2 };


