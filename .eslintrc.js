module.exports = {
  extends: ['@remix-run/eslint-config', 'wesbos'],
  rules: {
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~/*', './app/']],
      },
    },
  },
};
