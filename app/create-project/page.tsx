"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { SessionInterface } from "@/common.types";

const CreateProject = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return redirect("/");
  }

  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" />
    </Modal>
  );
};

export default CreateProject;
