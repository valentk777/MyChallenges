import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { HomeStackParamList } from '../navigators/MenuTabNavigator';
import { AuthStackParamList } from '../navigators/AuthStackNavigator';
import { useAuth } from '../hooks/useAuth';
import { LoginUser } from '../entities/user';

type SingInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SingInScreen'>;

export const SingInScreen = ({ navigation }: SingInScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const { signIn } = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    navigation.navigate("RegisterScreen", {});
  }

  const handleSignInButton = () => {
    const userCandidate = {} as LoginUser;
    userCandidate.email = email;
    userCandidate.password = password;
    
    signIn(userCandidate);
  }

  const renderHeaderTextContainer = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.titleTextStyle}>Welcome Back!</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTextStyle}>
          Please sign in to your account
        </Text>
      </View>
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <TextInput
      placeholder= "Email"
      placeholderTextColor="#6C6D72"
      style={styles.textInputStyle}
      onChangeText={setEmail}
    />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6C6D72"
        style={styles.textInputStyle}
        secureTextEntry
        onChangeText={setPassword}
      />
      {/* <TouchableOpacity
        style={styles.forgotButtonStyle}
        onPress={handleForgotPassword}
      >
        <Text
          style={styles.forgotPasswordTextStyle}
        >
           Forgot Password?
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.signInButtonStyle}
        onPress={handleSignInButton}
      >
        <Text style={styles.signInButtonTextStyle}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );


  const renderLoginButtonsContainer = () => {
    return (
      <View>
        {/* <TouchableOpacity
          style={styles.googleButtonStyle}
          onPress={handleGoogleLogIn}
        >
          <Image
            source={require("../../local-assets/google.png")}
            style={styles.logoImageStyle}
          />
          <Text style={styles.googleButtonTextStyle}>
            Sign In With Google
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.facebookButtonStyle}
          onPress={handleFacebookLogIn}
        >
          <Image
            source={require("../../local-assets/facebook.png")}
            style={styles.logoImageStyle}
          />
          <Text
            style={styles.facebookButtonTextStyle}
          >
            "Sign In With Facebook
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderSignUpButtonContainer = () => (
    <View style={styles.signUpButtonContainer}>
      <Text style={styles.signUpTextStyle}>
        Don't Have An Account ?
      </Text>
      <TouchableOpacity
        style={styles.signUpButtonStyle}
        onPress={handleRegistration}
      >
        <Text style={styles.signUpButtonTextStyle}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.newAccountContainer}>
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            style={styles.keyboardAvoidingViewStyle}
          >
            <SafeAreaView
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {renderHeaderTextContainer()}
              {renderInputContainer()}
            </SafeAreaView>
            <View
              style={{
                position: "absolute",
                bottom: 8,
              }}
            >
              {renderLoginButtonsContainer()}
              {renderSignUpButtonContainer()}
            </View>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
    </View >
  );
};

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

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


    screenContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    mainContainer: {
      backgroundColor: "#181A1F",
      alignItems: "center",
      flex: 1,
    },
    headerContainer: {
      marginTop: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    titleTextStyle: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "600",
    },
    descriptionTextStyle: {
      fontSize: 15,
      color: "#696A6F",
    },
    textInputContainer: {
      marginTop: 24,
      justifyContent: "center",
      width: ScreenWidth * 0.85,
    },
    textInputStyle: {
      height: 55,
      marginBottom: 8,
      fontSize: 16,
      paddingLeft: 32,
      backgroundColor: "#262A34",
      color: "#fff",
      borderRadius: 16,
    },
    forgotPasswordTextStyle: {
      color: "#6C6D72",
    },
    forgotButtonStyle: {
      height: 30,
      justifyContent: "center",
      marginLeft: "auto",
    },
    signInButtonStyle: {
      marginTop: 24,
      backgroundColor: "#5467FF",
      width: ScreenWidth * 0.85,
      height: 55,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    signInButtonTextStyle: {
      color: "#fff",
      fontWeight: "600",
    },
    logoImageStyle: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    googleButtonStyle: {
      backgroundColor: "#FFFFFF",
      width: ScreenWidth * 0.85,
      height: 55,
      marginTop: 8,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    googleButtonTextStyle: {
      color: "#181A1F",
      fontWeight: "600",
    },
    facebookButtonStyle: {
      backgroundColor: "#3A579B",
      width: ScreenWidth * 0.85,
      height: 55,
      marginTop: 8,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    facebookButtonTextStyle: {
      color: "#FFF",
      fontWeight: "600",
    },
    signUpButtonContainer: {
      marginTop: 8,
      width: ScreenWidth * 0.9,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    signUpButtonStyle: {
      height: 40,
      justifyContent: "center",
      marginLeft: 8,
    },
    signUpTextStyle: {
      fontSize: 14,
      color: "#fff",
    },
    signUpButtonTextStyle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#519bf4",
    },
    appleButtonStyle: {
      backgroundColor: "#FFFFFF",
      width: ScreenWidth * 0.85,
      height: 55,
      marginTop: 8,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    appleButtonTextStyle: {
      color: "#181A1F",
      fontWeight: "600",
    },
    newAccountContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    keyboardAvoidingViewStyle: {
      flex: 1,
    },
    descriptionContainer: {
      marginTop: 16,
    },
  });

  return styles;
};

export default SingInScreen;
