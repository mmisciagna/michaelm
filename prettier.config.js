module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^next(.*)$',
    '^react(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  singleQuote: true,
  quoteProps: 'consistent',
  singleAttributePerLine: true,
  htmlWhitespaceSensitivity: 'strict',
};
