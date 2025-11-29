import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    // Turbopack configuration (Dành cho lệnh dev --turbopack)
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },

    // Optimize build performance
    typescript: {
        ignoreBuildErrors: false,
    },

    eslint: {
        ignoreDuringBuilds: false,
    },

    // Webpack configuration (Dành cho lệnh build)
    webpack(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"))

        config.module.rules.push(
            // Cách 1: Import file .svg?url -> Dùng như ảnh bình thường
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            // Cách 2: Import file .svg -> Biến thành Component
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ["@svgr/webpack"],
            },
        )

        // Loại bỏ svg khỏi loader mặc định để tránh xung đột
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },

    // Image configuration
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
}

export default nextConfig
