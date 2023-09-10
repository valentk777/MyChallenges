import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import { useAuthorizationContext } from '../contexts/authorizationContext';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { CustomButton } from '../components/ButtonWrapper/CustomButton';
import { ButtonTypes } from '../entities/buttonTypes';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { signIn } = useAuthorizationContext();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.global}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.section}>
          <Image
            style={styles.image}
            source={require('../assets/logo/logo_500x500.png')}
          />
          <Text style={styles.text}>Challenge tracker</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            type={ButtonTypes.Primary}
            title="Show my challenges"
            onPress={() => {
              signIn();
            }}
          />
        </View>
      </LinearGradient>
    </View >
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    global: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    linearGradient: {
      flex: 1,
      colors: [theme.colors.primary, theme.colors.secondary]
    },
    section: {
      flex: 7,
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    image: {
      width: '40%',
      height: undefined,
      aspectRatio: 0,
    },
    text: {
      fontSize: 25,
      lineHeight: 30,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 30,
    },
    buttonContainer: {
      flex: 4,
      margin: 40,
    },
  });

  return styles;
};

export default LoginScreen;
