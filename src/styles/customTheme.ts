const palette = {
  darkGreen: '#5F7161',
  green: '#6D8B74',
  grey: '#D0C9C0',
  white: '#FFFFFF',
};

export const customTheme = {
  colors: {
    primary: palette.darkGreen,
    secondary: palette.green,
    background: palette.darkGreen,
    primaryButton: palette.green,
    secondaryButton: palette.grey,
    border: palette.green,
    card: palette.grey,
    text: palette.grey,
    notification: palette.grey,
    input: palette.green,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  text: {
    fontFamily: 'Times new roman'
  },
};

export const customDarkTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
//     background: palette.black,
//     foreground: palette.white,
//     primary: palette.grey,
  },
};
