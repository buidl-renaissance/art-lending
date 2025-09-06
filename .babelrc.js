// Note: With Next.js 13+ and the SWC compiler, this Babel config is primarily
// for fallback compatibility. The main styled-components configuration is in next.config.ts
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
        minify: false,
        transpileTemplateLiterals: false,
      },
    ],
  ],
};
