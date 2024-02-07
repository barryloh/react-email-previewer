module.exports = {
  extends: ['airbnb', 'plugin:react-hooks/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/no-did-update-set-state': 0,
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': 0,
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-plusplus': [
      1,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/no-extraneous-dependencies': [
      0,
      {
        optionalDependencies: true,
      },
    ],
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/no-cycle': 'off',
    'no-cycle': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'no-async-promise-executor': 'off',
    'react/prop-types': 'warn',
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    sessionStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  plugins: ['jest'],
  parserOptions: {
    requireConfigFile: 'false',
  },
  env: {
    'jest/globals': true,
  },
};
