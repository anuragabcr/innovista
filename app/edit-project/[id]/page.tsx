import { redirect } from "next/navigation";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  // const session = await getCurrentUser();
  // if (!session?.user) redirect("/");
  const result = await getProjectDetails(id);

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" project={result as ProjectInterface} />
    </Modal>
  );
};

export default EditProject;
