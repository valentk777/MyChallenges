import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import { useAuthorizationContext } from '../contexts/authorizationContext';
import { Button, ButtonTypes } from '../components/ButtonWrapper/ButtonWrapper';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'

interface LoginScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Login'> {
  setIsLoggedIn: (isAuthenticated: boolean) => void;
}

export const LoginScreen = (props: LoginScreenProps) => {
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
          {/* <View style={[{borderWidth:0, borderRadius:35},styles.dropShadow]}> */}
          <Image
            style={styles.image}
            source={require('./../img/logo_500x500.png')}
          />
          {/* </View> */}
          <Text style={styles.text}>Challenge tracker</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
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
      backgroundColor: theme.colors.primary,
      height: '100%'
    },
    linearGradient: {
      height: '100%',
      colors: [theme.colors.primary, theme.colors.secondary]
    },
    // dropShadow:{
    //   shadowColor: '#d86a1b',
    //   shadowOpacity: 0.2,
    //   shadowRadius: 1,
    //   elevation: 200,
    // },
    section: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    image: {
      width: '40%',
      height: undefined,
      aspectRatio: 1 / 1,
      // borderColor: '#d86a1b',
      // borderWidth: 5,
    },
    text: {
      fontSize: 20,
      lineHeight: 21,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 30,
    },
    buttonContainer: {
      margin: 20,
    },
  });
  return styles;
};


