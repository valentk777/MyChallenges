import React, { useContext } from 'react';
import { ButtonProps, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { customTheme } from '../../styles/customTheme';
import { ThemeContext } from '../../contexts/themeContext';
import { ButtonTypes } from '../../entities/buttonTypes';

interface ExpandedButtonProps extends ButtonProps {
    type: ButtonTypes;
}

export const CustomButton = (props: ExpandedButtonProps) => {
    const { onPress, title, type } = props;

    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);

    return (
        <TouchableOpacity
            style={
                type == ButtonTypes.Primary
                    ? styles.buttonPrimary
                    : styles.buttonSecondary
            }
            onPress={onPress}>
            <Text
                style={
                    type == ButtonTypes.Primary
                        ? styles.textPrimary
                        : styles.textSecondary
                }>
                {title}
            </Text>
        </TouchableOpacity>
    );
};


const createStyles = (theme: typeof customTheme) => {
    const styles = StyleSheet.create({
        buttonPrimary: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: theme.colors.primaryButton,
            borderColor: theme.colors.border,
            marginBottom: 20,
        },
        textPrimary: {
            fontSize: 16,
            lineHeight: 35,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        buttonSecondary: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: theme.colors.secondaryButton,
            borderColor: theme.colors.border,
            borderWidth: 3,
        },
        textSecondary: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: theme.colors.text,
        }
    });

    return styles;
};
