import { createNewProject } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { form, creatorId } = await req.json();
  console.log(form, creatorId);

  if (!creatorId || !form) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 400 }
    );
  }
  try {
    const result = await createNewProject(form, creatorId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("Image upload error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
