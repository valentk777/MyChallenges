import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { AuthStackParamList } from '../navigators/AuthStackNavigator';
import { logo } from '../assets';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderHeaderContainer = () => (
    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
      <Image
        style={styles.image}
        source={logo['logo_500x500.png']}
      />
      <Text style={styles.text}>My Challenges</Text>
    </Animated.View>
  );

  return (
    <View style={styles.global}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        {renderHeaderContainer()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.register}
            onPress={() => navigation.navigate('RegisterScreen', {})}
          >
            <Text style={styles.bottomText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.signIn}
            onPress={() => navigation.navigate('SingInScreen', {})}
          >
            <Text style={{ ...styles.bottomText, color: theme.colors.white }}>SignIn</Text>
          </TouchableOpacity>
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
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    buttonContainer: {
      height: '8%',
      marginLeft: '10%',
      marginRight: '10%',
      marginBottom: '20%',
      flexDirection: 'row'
    },
    image: {
      width: '40%',
      height: undefined,
      aspectRatio: 1,
    },
    text: {
      fontSize: 20,
      lineHeight: 30,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      marginTop: 30,
    },
    register: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 16,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    signIn: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 16,
      backgroundColor: 'transparent',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.white,
    },
    bottomText: {
      fontSize: 14,
      color: theme.colors.black,
      fontFamily: theme.fonts.medium,
      fontWeight: '600'
    }
  });

  return styles;
};

export default LoginScreen;
