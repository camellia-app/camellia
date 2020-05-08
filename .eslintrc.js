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
    'sort-keys-fix',
    'react-hooks'
  ],
  root: true,
  rules: {
    "max-len": 0,
    "newline-before-return": ["error"],
    "react/destructuring-assignment": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}],
    "sort-keys-fix/sort-keys-fix": "warn",
  },
  settings: {
    react: {
      pragma: 'h',
    },
  },
};
