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
    const userID = formData.get("userID") as string;

    if (!file || !userID) {
      return NextResponse.json({ error: "Missing file or userID" }, { status: 400 });
    }


    

    const extension = file.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${userID}-${timestamp}.${extension}`;
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
