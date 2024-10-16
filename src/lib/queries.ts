import extractImageUrls from "./parser";

export type Project = {
  slug: string;
  title: string | null;
  modified: string;
  projectFields: {
    projectTitle: string | null;
    projectOverview: string | null;
    projectDetails: string | null;
    projectConclusion: string | null;
    projectSeoDescription: string | null;
    imageGrid: string[] | null;
    projectThumbnail: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
    video: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
    videoThumbnail: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
    videoPreview: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
  };
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const query = `query GetProject {
  project(id: "${slug}", idType: SLUG) {
    title
    slug
    modified
    projectFields {
      projectTitle
      projectOverview
      projectDetails
      projectConclusion
      projectSeoDescription
      imageGrid
      projectThumbnail {
        node {
          mediaItemUrl
        }
      }
      video {
        node {
          mediaItemUrl
        }
      }
      videoThumbnail {
        node {
          mediaItemUrl
        }
      }
      videoPreview {
        node {
          mediaItemUrl
        }
      }
    }
  }
}`;

  const response = await fetch(`https://admin.moshnstudios.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "force-cache",
  });

  if (!response.ok)
    throw new Error("Something went wrong, please try again later.");

  const data = (await response.json()) as { data: { project: Project } };

  const imageGrid = extractImageUrls(
    (data.data.project.projectFields?.imageGrid as unknown as string | null) ??
      "",
  );

  return {
    ...data.data.project,
    projectFields: {
      ...data.data.project.projectFields,
      imageGrid,
    },
  };
};

export type Projects = {
  slug: string;
  modified: string;
  projectFields: {
    video: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
    videoThumbnail: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
    videoPreview: {
      node: {
        mediaItemUrl: string;
      };
    } | null;
  };
}[];

export const getProjects = async (limit = 10): Promise<Projects> => {
  const query = `query GetProjects {
  projects(first: ${limit}) {
    nodes {
      slug
      modified
      projectFields {
        video {
          node {
            mediaItemUrl
          }
        }
        videoThumbnail {
          node {
            mediaItemUrl
          }
        }
        videoPreview {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`;

  const response = await fetch(`https://admin.moshnstudios.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "force-cache",
  });

  if (!response.ok)
    throw new Error("Something went wrong, please try again later.");

  const data = (await response.json()) as {
    data: { projects: { nodes: Project[] } };
  };

  return data.data.projects.nodes;
};
