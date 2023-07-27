import { ProjectForm } from "@/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

export const CreateUser = async (
  name: string,
  email: string,
  avatarUrl: string
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      avatarUrl,
    },
  });
  return user;
};

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagepath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagepath }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string
) => {
  try {
    const imageResponse = await uploadImage(form.image);
    const imageUrl = imageResponse.url;

    if (!imageUrl) {
      throw new Error("Failed to upload image");
    }

    const project = await prisma.project.create({
      data: {
        ...form,
        image: imageUrl,
        createdBy: {
          connect: {
            id: creatorId,
          },
        },
      },
    });

    return project;
  } catch (error) {
    console.error("Error creating new project:", error);
    throw error;
  }
};
