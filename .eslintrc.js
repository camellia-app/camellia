module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  root: true,
  rules: {
    "max-len": ["error", { "code": 120 }],
    "newline-before-return": ["error"],
    "react/destructuring-assignment": 0,
    "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}]
  },
  settings: {
    react: {
      pragma: 'h',
    },
  },
};
