// import globals from 'globals'
// import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

// import path from 'path'
// import { fileURLToPath } from 'url'
// import { FlatCompat } from '@eslint/eslintrc'
// import pluginJs from '@eslint/js'

// // mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

// export default [
//     {
//         files: ['**/*.ts'],
//         ignores: ['**/.sst/**'],
//         languageOptions: { sourceType: 'commonjs' },
//         rules: {
//             "@typescript-eslint/explicit-function-return-type": 1
//         }
//     },
//   { languageOptions: { globals: globals.browser } },
//   ...compat.extends('standard-with-typescript'),
//   pluginReactConfig,
// ]


// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
);