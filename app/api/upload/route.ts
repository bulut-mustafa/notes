import { NextResponse } from "next/server";
import { S3 } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3 = new S3({
  region: "ap-southeast-2",
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing file or userID" }, { status: 400 });
    }


    

    const originalName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension from original file name
    const extension = file.name.split(".").pop(); // Get file extension
    const timestamp = Date.now();
    const fileName = `${timestamp}-${originalName}.${extension}`;
    const bufferedImage = await file.arrayBuffer();

   

    // Upload new picture to S3
    try {
      await s3.putObject({
        Bucket: "notes-app-note-images",
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: file.type,
      });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      return NextResponse.json({ error: "S3 upload failed" }, { status: 500 });
    }

    // Construct image URL
    const imageUrl = `https://notes-app-note-images.s3.amazonaws.com/${fileName}`;

   

    // Revalidate profile page
    revalidatePath(`/notes`, "layout");

    return NextResponse.json({ success: true, fileName, imageUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
