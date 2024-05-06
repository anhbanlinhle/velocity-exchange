module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    "airbnb",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    indent: ['error', 2],
    'max-len': 'off',
    'react/jsx-first-prop-new-line': 'error',
    "linebreak-style": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react/jsx-props-no-spreading": "off",
  },
};
