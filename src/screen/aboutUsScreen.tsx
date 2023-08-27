import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { HomeStackParamList } from '../components/Menu/Menu';

type AboutUsScreenProps = NativeStackScreenProps<HomeStackParamList, 'AboutUs'>;

export const AboutUsScreen = ({ navigation }: AboutUsScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.section}>
          <Text style={styles.text}>AboutUs information screen.</Text>
        </View>
      </LinearGradient>
    </View >
  );
};

const createStyles = (theme: typeof customTheme) => {
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
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 30,
    },
  });

  return styles;
};
