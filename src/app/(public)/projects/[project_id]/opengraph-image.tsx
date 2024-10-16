/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getProjectBySlug } from "~/lib/queries";
import axios from "axios";
import sharp from "sharp";

// Image metadata
export const alt = "";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/jpeg";

export default async function Image({
  params,
}: {
  params: { project_id: string };
}) {
  const project = await getProjectBySlug(params.project_id);

  if (!project.projectFields.projectThumbnail?.node.mediaItemUrl) return null;

  const response = await axios.get<BufferEncoding>(
    project.projectFields.projectThumbnail?.node.mediaItemUrl,
    { responseType: "arraybuffer" },
  );
  const imageBuffer = Buffer.from(response.data, "binary");

  const compressedImageBuffer = await sharp(imageBuffer)
    .resize(1200, 630, {
      fit: "cover",
    })
    .jpeg({ quality: 40 })
    .toBuffer();

  const base64Image = `data:image/jpeg;base64,${compressedImageBuffer.toString(
    "base64",
  )}`;

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
          src={base64Image} // Use the compressed image here
          alt={alt}
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
