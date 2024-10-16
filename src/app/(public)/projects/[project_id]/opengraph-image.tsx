/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getProjectBySlug } from "~/lib/queries";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { project_id: string };
}) {
  const project = await getProjectBySlug(params.project_id);

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src={project.projectFields.projectThumbnail?.node.mediaItemUrl}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
