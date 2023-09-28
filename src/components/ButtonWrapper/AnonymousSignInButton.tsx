import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { icons } from '../../assets'
import { customTheme } from '../../styles/customTheme'
import { ThemeContext } from '../../contexts/themeContext'

interface AnonymousSignInButtonProps {
  text: string;
  onSignPress(): void;
}

export const AnonymousSignInButton = (props: AnonymousSignInButtonProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const { text, onSignPress } = props;

  return (
    <TouchableOpacity onPress={onSignPress} style={styles.button}>
      <Image
        source={icons['user.png']}
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
      width: 25,
      height: 25,
      marginRight: 15,
    },
    text: {
      color: theme.colors.black,
      fontWeight: "600",
    },
    button: {
      backgroundColor: theme.colors.white,
      width: '100%',
      height: 45,
      marginTop: 8,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return styles;
};
