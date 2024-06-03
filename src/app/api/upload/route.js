import { NextResponse } from "next/server";
import { Magika } from "magika";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileContent = await file.text();

  const fileBytes = new Uint8Array(await file.arrayBuffer());

  const magika = new Magika();
  await magika.load();

  const prediction = await magika.identifyBytes(fileBytes);

  return NextResponse.json({
    content: fileContent,
    language: prediction?.label,
  });
}
