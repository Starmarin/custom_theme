module.exports = {
  extends: ['@vue/airbnb', '@vue/typescript/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    __webpack_public_path__: true,
    __BVA__: true,
    Shopify: true,
  },
  rules: {
    // "prettier/prettier": ["error"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: ['warn'],
    '@typescript-eslint/camelcase': ['warn'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-unused-expressions': ['warn'],
    'no-param-reassign': ['warn'],
    'arrow-parens': 'off',
    'prefer-destructuring': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'prefer-template': 'off',
    'no-plusplus': 'off',
    'prefer-const': 'off',
    'no-lonely-if': 'off',
    'no-underscore-dangle': 'off',
    extensions: 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/require-default-prop': 'off',
      },
    },
    {
      //This is to prevent the dependencies of the Gulp workflow tasks (i.e. devDependencies) from being viewed as project level dependencies.
      files: ['tasks/*.js', 'webpack.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      // Based on our folder structure and how we are doing some imports we had a lot of false positives with this rule. Disabling for now but we might want to look for a better alternative.
      // Likely non-issue disabling this as if a path was unresolved we wouldnt have working sites anyway, which is obvious given our current process
      files: ['*'],
      rules: {
        'import/no-unresolved': 'off',
        'import/extensions': ['warn', 'always', { ignorePackages: true }],
      },
    },
    {
      // Allow state to be mutated in vuex mutations
      files: ['src/scripts/store/**/*'],
      rules: {
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: ['state'],
          },
        ],
      },
    },
  ],
};
