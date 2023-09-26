import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { icons } from '../../assets'
import { customTheme } from '../../styles/customTheme'
import { ThemeContext } from '../../contexts/themeContext'

interface GoogleSignInButtonProps {
  text: string;
  onGoogleSignPress(): void;
}

export const GoogleSignInButton = (props: GoogleSignInButtonProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const { text, onGoogleSignPress } = props;

  return (
    <TouchableOpacity onPress={onGoogleSignPress} style={styles.button}>
      <Image
        source={icons['google-button.png']}
        style={styles.image}
      />
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    image: {
      width: 35,
      height: 35,
    },
    text: {
      color: theme.colors.black,
      fontWeight: "600",
    },
    button: {
      backgroundColor: theme.colors.white,
      width: '100%',
      height: 55,
      marginTop: 8,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return styles;
};
