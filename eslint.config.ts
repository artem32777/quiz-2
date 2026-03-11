import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/no-v-html': 0,
      'vue/no-multiple-template-root': 0,
      '@stylistic/arrow-parens': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
])
