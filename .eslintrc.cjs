module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:i18next/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'storybook-static'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'unused-imports', 'import', 'i18next'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    'prefer-template': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        distinctGroup: false,
      },
    ],
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [],
        ignore: [],
      },
    ],
  },
  globals: {
    __API__: true,
    __API_KEY__: true,
  },
}
