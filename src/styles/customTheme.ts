const palette = {
  darkBlue: '#0d132b',
  darkBlue2: '#1f4063',
  blue1: '#079aa4',
  electric: '#035471',
  darkBlue3: '#242c50',
  white: '#FFFFFF',
  black: '#000000',
  red: '#e32f45',
  darkRed: '#80211b',
  grey: '#748c98',
};

export const customTheme = {
  colors: {
    primary: palette.darkBlue,
    secondary: palette.darkBlue2,
    background: palette.darkBlue,
    primaryButton: palette.darkBlue2,
    secondaryButton: palette.blue1,
    border: palette.darkBlue2,
    card: palette.blue1,
    text: palette.white,
    notification: palette.blue1,
    input: palette.blue1,
    tile1: palette.blue1,
    tile2: palette.electric,
    tile3: palette.darkBlue3,
    white: palette.white,
    black: palette.black,
    focused: palette.red,
    menuNotFocused: palette.grey,
    heart: palette.darkRed,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  text: {
    fontFamily: 'Times new roman',
  },
};

export const customDarkTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
  },
};
