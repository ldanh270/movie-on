import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
	// Ignore build and cache folders
	globalIgnores(['.next', 'dist', 'node_modules', '.turbo']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended, // ESLint recommended rules
			tseslint.configs.recommended, // TypeScript ESLint rules
			reactHooks.configs['recommended-latest'], // Latest React Hooks rules
			reactRefresh.configs.vite, // React Fast Refresh linting
			'next/core-web-vitals', // Next.js Core Web Vitals rules
			'next/typescript', // Next.js TypeScript rules
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser, // Browser environment globals
		},
		rules: {
			'react/react-in-jsx-scope': 'off', // React import not needed in Next.js
			'react/no-unknown-property': ['error', { ignore: ['fetchPriority'] }], // Allow App Router props
			'react/display-name': 'off', // Allow anonymous arrow function components
			'react-hooks/exhaustive-deps': 'warn', // Warn on missing hook deps
			'react/prop-types': 'off', // Disable prop-types check when using TypeScript
			'@next/next/no-html-link-for-pages': 'off', // Disable static link page check for dynamic routing
			'import/no-anonymous-default-export': 'off', // Allow anonymous default exports (Turbopack friendly)
		},
	},
])
