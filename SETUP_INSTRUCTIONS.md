# Setup Instructions

## Install Dependencies

To complete the setup, run one of the following commands in your terminal:

```bash
# Using npm
npm install

# Using yarn (if available)
yarn install
```

This will install:
- `styled-components@^6.1.8`
- `@types/styled-components@^5.1.34`

## What's Been Fixed

✅ **Theme Configuration** - Centralized theme in `/src/styles/theme.ts`
✅ **ThemeProvider Setup** - Added to `_app.tsx` for global theme access
✅ **TypeScript Declarations** - Added proper type definitions
✅ **Styled Components Syntax** - Fixed all template literal and conditional syntax issues
✅ **Next.js Configuration** - Enabled styled-components compiler with SWC
✅ **Server-Side Rendering** - Configured styled-components SSR using Next.js 15 native support
✅ **Font Loading** - Added Google Fonts (Inter & Playfair Display)

## Remaining TypeScript Warnings

The remaining linter warnings are mostly TypeScript implicit `any` type warnings, which are non-breaking and will not affect functionality. These can be addressed later if strict type checking is desired.

## Development

After installing dependencies, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

Your art lending platform should now work perfectly with the new theme system!
