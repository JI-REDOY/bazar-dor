import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.api-store.workers.dev",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;