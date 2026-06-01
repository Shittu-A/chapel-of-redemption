import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chapel of Redemption ABU Samaru",
    short_name: "Chapel of Redemption",
    description: "Official website of Chapel of Redemption, Ahmadu Bello University, Samaru, Zaria",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1c1917",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
