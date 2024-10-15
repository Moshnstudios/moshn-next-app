await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.moshnstudios.com",
      },
    ],
  },
};

export default config;
