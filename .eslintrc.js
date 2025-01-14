module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: false,
          },
        ],
      },
    },
  ],
}