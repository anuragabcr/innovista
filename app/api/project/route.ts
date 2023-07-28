import {
  createNewProject,
  getProjectDetails,
  updateProject,
} from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { form, creatorId } = await req.json();

  if (!creatorId || !form) {
    return NextResponse.json(
      { message: "Form Data is required" },
      { status: 400 }
    );
  }
  try {
    const result = await createNewProject(form, creatorId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("Project creation error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { form, projectId } = await req.json();

  if (!projectId || !form) {
    return NextResponse.json(
      { message: "Form Data is required" },
      { status: 400 }
    );
  }
  try {
    const result = await updateProject(form, projectId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("Project creation error:- ", error);
    return NextResponse.json(error, { status: 500 });
  }
}
