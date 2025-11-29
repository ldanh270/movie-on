import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import { dirname } from "path"
import tseslint from "typescript-eslint"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

export default tseslint.config(
    {
        ignores: [
            ".next/**",
            "dist/**",
            "node_modules/**",
            ".turbo/**",
            "out/**",
            "build/**",
            "bun.lockb",
            "bun.lock",
            "*.lock",
            "*.lockb",
            "coverage/**",
        ],
    },

    ...compat.extends("next/core-web-vitals"),

    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": "off",
            "react/no-unknown-property": ["error", { ignore: ["fetchPriority"] }], // Tắt báo lỗi cho fetchPriority (Hàm tối ưu tốc độ render ảnh)
            indent: ["error", 4, { SwitchCase: 1 }], // case lùi 1 cấp so với switch
        },
    },
)
