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

export const fetchAllProjects = async (
  category?: string | null,
  endcursor?: string | null
) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        category: category ? { equals: category } : undefined,
      },
      take: 8,
      skip: endcursor ? 1 : 0,
      cursor: endcursor ? { id: endcursor } : undefined,
      include: {
        createdBy: true,
      },
    });

    const pageInfo = {
      hasNextPage: projects.length === 8,
      hasPreviousPage: !!endcursor,
      startCursor: projects.length ? projects[0].id : null,
      endCursor: projects.length ? projects[projects.length - 1].id : null,
    };

    return { pageInfo, edges: projects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectDetails = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        createdBy: true,
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: { id },
    });

    return deletedProject;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const getUserProjects = async (id: string, last?: number) => {
  try {
    const userWithProjects = await prisma.user.findUnique({
      where: { id },
      include: {
        projects: {
          take: last,
          select: {
            id: true,
            title: true,
            image: true,
          },
        },
      },
    });

    return userWithProjects?.projects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};
