module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    commonjs: true,
    node: true,
    mocha: true,
    jest: true,
  },
  rules: {
    'arrow-parens': 0,
    'eslint(prefer-destructuring)': 0,
    'implicit-arrow-linebreak': 0,
    'eslint(arrow-body-style)': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    'import/no-extraneous-dependencies': 0,
    'comma-dangle': 0,
    'member-delimiter-style': 0,
    'eslint(@typescript-eslint/member-delimiter-style)': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/indent': [2, 2],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-useless-constructor': 0,
    'for-direction': 2,
    'getter-return': 2,
    'no-console': 2,
    'no-dupe-args': 2,
    'no-dupe-else-if': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-empty-character-class': 2,
    'no-extra-parens': 2,
    'no-extra-semi': 2,
    'no-prototype-builtins': 2,
    'no-regex-spaces': 2,
    'no-setter-return': 2,
    'no-sparse-arrays': 2,
    'no-template-curly-in-string': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'class-methods-use-this': 0,
    complexity: ['error', 3],
    'default-param-last': ['error'],
    'no-empty-function': 0,
    'no-magic-numbers': 2,
    'no-new-wrappers': 2,
    'no-param-reassign': 2,
    'no-proto': 2,
    'no-return-await': 2,
    'require-await': 2,
    'no-unused-vars': 2,
    'array-element-newline': 2,
    camelcase: 2,
    'prefer-object-spread': 2,
    'prefer-const': 2,
    'prefer-spread': 2,
    semi: 0,
    'eslint(import/prefer-default-export)': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    semicolon: 0,
  },
}