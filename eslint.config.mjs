// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [...compat.extends([
  'next',
  'next/core-web-vitals',
  'prettier',
]), {
  plugins: {
    prettier: require('eslint-plugin-prettier'),
  },
  rules: {
    'prettier/prettier': 'error',
  },
}, ...storybook.configs["flat/recommended"], ...storybook.configs["flat/recommended"]]

export default config
