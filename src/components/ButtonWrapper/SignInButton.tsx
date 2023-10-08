import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { customTheme } from '../../styles/customTheme'
import { useTheme } from '../../hooks/useTheme';

interface SignInButtonProps {
  icon: ImageSourcePropType;
  text: string;
  onSignPress(): void;
}

export const SignInButton = (props: SignInButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { text, icon, onSignPress } = props;

  return (
    <TouchableOpacity onPress={onSignPress} style={[styles.button, theme.shadows.medium]}>
      <Image
        source={icon}
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
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.primary,
      fontWeight: "600",
    },
    button: {
      backgroundColor: theme.colors.canvas,
      width: '100%',
      height: 45,
      marginTop: 8,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
  });

  return styles;
};
