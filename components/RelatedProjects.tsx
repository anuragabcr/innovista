"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";

type Props = {
  userId: string;
  name: string;
  projectId: string;
};

const RelatedProjects = ({ userId, projectId, name }: Props) => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/projects/${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      setProjects(data);
    };
    fetchData();
  }, [userId]);

  if (projects?.length === 0) return <div>Loading</div>;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {name}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {projects?.map((node) => (
          <div
            className="flexCenter related_project-card drop-shadow-card"
            key={node.id}
          >
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
