# Theme and Styled Components Setup

This document outlines the theme and styled-components setup for the Art Lending Platform.

## Theme Configuration

### Theme Colors
The art theme includes carefully selected colors that blend gallery aesthetics with fintech trust:

- **darkBg**: `#1a1a2e` - Midnight blue background
- **charcoal**: `#16213e` - Darker charcoal for depth
- **gold**: `#d4af37` - Gallery gold for luxury
- **teal**: `#40e0d0` - Creative teal for vibrancy
- **purple**: `#9d4edd` - Creative purple for artistic flair
- **white**: `#ffffff` - Trust white for clarity
- **lightGray**: `#f8f9fa` - Light gray for subtle elements
- **mutedGold**: `#b8860b` - Muted gold for variations

### File Structure

```
src/
├── styles/
│   ├── theme.ts          # Theme configuration and TypeScript types
│   ├── styled.d.ts       # Styled-components TypeScript declarations
│   └── globals.css       # Global CSS styles
├── pages/
│   ├── _app.tsx          # ThemeProvider setup
│   ├── _document.tsx     # Font loading and SSR setup
│   └── index.tsx         # Main page with styled components
```

## Usage

### Accessing Theme in Styled Components

```typescript
const StyledComponent = styled.div`
  background-color: ${({ theme }) => theme.gold};
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.teal};
`;
```

### TypeScript Support

The theme is fully typed with TypeScript. The `styled.d.ts` file extends the default styled-components theme interface to include our custom theme properties.

## Features

- ✅ Centralized theme configuration
- ✅ TypeScript support with full type safety
- ✅ ThemeProvider for global theme access
- ✅ SSR support with Next.js
- ✅ Google Fonts integration (Inter & Playfair Display)
- ✅ Responsive design patterns

## Dependencies

- `styled-components`: ^6.1.8
- `@types/styled-components`: ^5.1.34

## Next.js Configuration

The `next.config.ts` includes styled-components compiler support for optimal performance and SSR.
