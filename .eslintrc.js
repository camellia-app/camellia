module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
  ],
  settings: {
    react: { pragma: 'h' },
  },
  env: {
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
