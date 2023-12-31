import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { RootStackParamList } from '../navigators/RootNavigator';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

export const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.section}>
          <Text style={styles.text}>Getting token...</Text>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    </View >
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearGradient: {
      flex: 15,
      colors: [theme.colors.primary, theme.colors.secondary]
    },
    section: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    text: {
      fontSize: 20,
      lineHeight: 21,
      fontFamily: theme.fonts.light,
      color: theme.colors.canvas,
      marginTop: 30,
    },
  });

  return styles;
};

export default SplashScreen;
