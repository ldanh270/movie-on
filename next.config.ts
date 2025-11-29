import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    // Turbopack configuration
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
        // Only run type checking in production builds
        ignoreBuildErrors: false,
    },

    eslint: {
        // Only run linting in production builds
        ignoreDuringBuilds: false,
    },

    // Webpack configuration
    webpack(config, { isServer }) {
        // Only run SVG optimization on client-side
        if (!isServer) {
            const fileLoaderRule = config.module.rules.find((rule: any) =>
                rule.test?.test?.(".svg"),
            )

            config.module.rules.push(
                {
                    ...fileLoaderRule,
                    test: /\.svg$/i,
                    resourceQuery: /url/,
                },
                {
                    test: /\.svg$/i,
                    issuer: fileLoaderRule.issuer,
                    resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                    use: ["@svgr/webpack"],
                },
            )

            fileLoaderRule.exclude = /\.svg$/i
        }

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
