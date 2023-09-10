import { ImageSourcePropType, View, Image, Text } from "react-native";

interface CustomTabBarIconProps {
    focused: boolean;
    styles: any;
    theme: any;
    text: string;
    iconUrl: ImageSourcePropType
}

export const CustomTabBarIcon = (props: CustomTabBarIconProps) => {
    const { focused, styles, theme, text, iconUrl } = props;

    return (
        <View style={styles.menuBar}>
            <Image
                source={iconUrl}
                resizeMode="contain"
                style={{
                    tintColor: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                    ...styles.menuIcon
                }}
            />
            <Text style={{
                color: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                ...styles.menuText,
            }}>
                {text}
            </Text>
        </View>
    )
};