export interface Palette {
  canvas: string;
  canvasInverted: string;
  primary: string;
  secondary: string;
  tertiary: string;
  exceptional: string;
}

export interface Fonts {
  bold: string;
  semiBold: string;
  medium: string;
  regular: string;
  light: string;
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  light: Shadow;
  medium: Shadow;
  dark: Shadow;
  primary: Shadow;
}

export interface Sizes {
  small: number;
  medium: number;
  large: number;
  extraLarge: number;
}

export interface AppTheme {
  colors: Palette;
  sizes: Sizes;
  shadows: Shadows;
  fonts: Fonts;
}
