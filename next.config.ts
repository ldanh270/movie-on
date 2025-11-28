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

    // Webpack configuration
    webpack(config) {
        /**
         * Tìm rule xử lý file hình ảnh hiện tại (Mặc định của Next.js)
         * - Webpack mặc định của Next.js có một rule để xử lý các file hình ảnh bao gồm SVG.
         * - Chúng ta sẽ tìm rule này để tái sử dụng trong cấu hình mới.
         */
        const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"))

        // Add custom rules for SVG handling
        config.module.rules.push(
            /**
             * If the SVG is imported with a ?url query, use the file loader
             * - Ví dụ: import iconUrl from './icon.svg?url'
             * - Lúc này, iconUrl chỉ là đường dẫn tới file SVG, không phải một React Component.
             * - Dùng như sau: <img src={iconUrl} />
             */
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // import icon from './icon.svg?url'
            },
            /**
             * Rule 2: Mặc định () -> Dùng SVGR biến thành Component
             * - Ví dụ: import Icon from './icon.svg'
             * - Lúc này, Icon là một React Component.
             * - Dùng như sau: <Icon />
             */
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ["@svgr/webpack"],
            },
        )

        // Báo cho Next.js bỏ qua rule mặc định với các file SVG thông thường
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
}

export default nextConfig
