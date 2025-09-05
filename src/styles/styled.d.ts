import 'styled-components';
import type { Theme } from './theme';

// Extend the DefaultTheme interface to include our custom theme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
