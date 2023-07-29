"use client";
import { useState, useEffect } from "react";

import { ProjectInterface } from "@/common.types";
import ProjectCard from "./ProjectCard";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Projects = ({ category }: { category?: string }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/projects`, {
        method: "POST",
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
      setProjects(data?.edges);
    };
    fetchData();
  }, [category]);

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        {category}
        <p className="no-result-text text-center">
          No Projects found <br /> Go create some first
        </p>
      </section>
    );
  }

  return (
    <section className="projects-grid">
      {projects.map((project: ProjectInterface) => (
        <ProjectCard
          key={project?.id}
          id={project?.id}
          image={project?.image}
          title={project?.title}
          name={project?.title}
          avatarUrl={project?.createdBy?.avatarUrl}
          userId={project?.createdBy?.id}
        />
      ))}
    </section>
  );
};

export default Projects;
