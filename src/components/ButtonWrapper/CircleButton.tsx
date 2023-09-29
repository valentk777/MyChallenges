import { useContext } from "react";
import { TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { customTheme } from "../../styles/customTheme";

interface AnonymousSignInButtonProps {
  imgUrl: ImageSourcePropType;
  style: any;
  onPress(): void;
}

export const CircleButton = ({ imgUrl, onPress, style, ...props }: AnonymousSignInButtonProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.container, style, props]}
      onPress={onPress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};


const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
      container: {
          width: 40,
          height: 40,
          backgroundColor: theme.colors.white,
          position: "absolute",
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          // ...SHADOWS.light,
          
      },
  });

  return styles;
};
