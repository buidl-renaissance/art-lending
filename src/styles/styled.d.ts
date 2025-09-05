import 'styled-components';
import { Theme } from './theme';

// Extend the DefaultTheme interface to include our custom theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
