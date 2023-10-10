import React from "react";
import { TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from "../../styles/themeModels";

interface AnonymousSignInButtonProps {
  imgUrl: ImageSourcePropType;
  style: any;
  onPress(): void;
}

export const CircleButton = ({ imgUrl, onPress, style, ...props }: AnonymousSignInButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.container, style, props]}
      onPress={onPress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.canvas,
      position: "absolute",
      borderRadius: theme.sizes.extraLarge,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: theme.sizes.large,
      height: theme.sizes.large,
    }
  });

  return styles;
};
