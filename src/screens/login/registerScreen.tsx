import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image, useWindowDimensions, Animated } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { AuthStackParamList } from '../../navigators/AuthStackNavigator';
import { useAuth } from '../../hooks/useAuth';
import { LoginUser } from '../../entities/user';
import { icons, logo } from '../../assets';
import { SignInButton } from '../../components/ButtonWrapper/SignInButton';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>;

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    const window = useWindowDimensions();

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const { createUser, signInAnonymously, loginOrSignUpWithGoogle } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        navigation.navigate("SingInScreen", {});
    }

    const handleRegisterButton = () => {
        if (password === null || password === "") {
            Alert.alert("Password cannot be empty");
            return;
        }

        const userCandidate = {} as LoginUser;
        userCandidate.email = email.toLowerCase().trim();
        userCandidate.password = password;

        if (userCandidate.email === null || userCandidate.email === "") {
            Alert.alert("Email cannot be empty");
            return;
        }

        createUser(userCandidate);
    }

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
                style={styles.headerImage}
                source={logo['logo_500x500.png']}
            />
            <Text style={styles.titleTextStyle}>Create Your Account!</Text>
            {/* <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTextStyle}>
              Please fill in the form to continue
            </Text>
          </View> */}
        </Animated.View>
    );

    const renderInputContainer = () => (
        <View style={styles.textInputContainer}>
            <View style={styles.inputArea}>
                <Text style={styles.inputText}>
                    Email
                </Text>
                <TextInput
                    placeholder="Enter your email..."
                    placeholderTextColor={theme.colors.canvasInverted}
                    style={styles.textInputStyle}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputArea}>
                <Text style={styles.inputText}>
                    Password
                </Text>
                <TextInput
                    placeholder="Enter your password..."
                    placeholderTextColor={theme.colors.canvasInverted}
                    style={styles.textInputStyle}
                    secureTextEntry
                    onChangeText={setPassword}
                />
            </View>
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
            <View style={styles.registerButtonContainer}>
                <TouchableOpacity
                    style={styles.registerButtonStyle}
                    onPress={handleRegisterButton}
                >
                    <Text style={styles.registerButtonTextStyle}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderExternalOptionsContainer = () => (
        <View style={styles.externalOptionsContainer}>
            <View style={styles.orTextArea}>
                <View style={styles.horizontalLine} />
                <View>
                    <Text style={styles.orTextStyle}>OR</Text>
                </View>
                <View style={styles.horizontalLine} />
            </View>
            <SignInButton text="Continue with Google" onSignPress={loginOrSignUpWithGoogle} icon={icons['google-button.png']} />
            <SignInButton text="Continue without Login" onSignPress={signInAnonymously} icon={icons['user.png']} />
        </View>
    );

    const renderSignInTextContainer = () => (
        <View style={styles.signInButtonContainer}>
            <Text style={styles.signInQuestionTextStyle}>
                Have An Account?
            </Text>
            <TouchableOpacity
                style={styles.signInButtonStyle}
                onPress={handleSignIn}
            >
                <Text style={styles.signInButtonTextStyle}>
                    Sign In
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ ...styles.container, height: window.height }}>
            <LinearGradient
                colors={styles.linearGradient.colors}
                style={styles.linearGradient}
            >
                <View style={styles.mainContainer}>
                    {renderHeaderContainer()}
                    {renderInputContainer()}
                    {renderExternalOptionsContainer()}
                    {renderSignInTextContainer()}
                </View>
            </LinearGradient>
        </View  >
    );
};

const createStyles = (theme: AppTheme) => {
    const styles = StyleSheet.create({
        container: {
        },
        linearGradient: {
            flex: 1,
            colors: [theme.colors.primary, theme.colors.secondary],
            alignItems: "center",
        },
        mainContainer: {
            flex: 1,
            flexDirection: 'column',
            width: '80%',
            alignItems: "center",
        },
        headerContainer: {
            width: '100%',
            flex: 4,
            alignItems: "center",
            justifyContent: 'space-evenly',
        },
        headerImage: {
            width: '40%',
            height: undefined,
            aspectRatio: 1,
        },
        titleTextStyle: {
            fontFamily: theme.fonts.bold,
            fontSize: 25,
            color: theme.colors.canvas,
            fontWeight: "600",
        },
        textInputContainer: {
            flex: 3,
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: "flex-start",
        },
        inputArea: {
            flex: 1,
            width: '100%',
        },
        inputText: {
            fontFamily: theme.fonts.medium,
            color: theme.colors.canvas,
        },
        textInputStyle: {
            fontFamily: theme.fonts.light,
            padding: 0,
            borderBottomColor: theme.colors.canvas,
            borderBottomWidth: 1,
            color: theme.colors.canvas,
        },
        registerButtonContainer: {
            flex: 1,
            width: '100%',
            justifyContent: "center",
            alignItems: "center",
        },
        registerButtonStyle: {
            height: '60%',
            width: '80%',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: theme.colors.tertiary,
        },
        registerButtonTextStyle: {
            fontFamily: theme.fonts.semiBold,
            color: theme.colors.canvas,
            fontWeight: "600",
        },
        externalOptionsContainer: {
            flex: 2.5,
            width: '100%',
            alignItems: "center",
        },
        orTextArea: {
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 18,
        },
        horizontalLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.canvas,
        },
        orTextStyle: {
            fontSize: 12,
            fontFamily: theme.fonts.light,
            color: theme.colors.canvas,
            paddingRight: 20,
            paddingLeft: 20,
        },
        signInButtonContainer: {
            flex: 1,
            width: '100%',
            justifyContent: "center",
            flexDirection: 'row',
        },
        signInQuestionTextStyle: {
            fontFamily: theme.fonts.light,
            color: theme.colors.canvas,
            fontSize: 14,
        },
        signInButtonStyle: {
            marginLeft: 20,
        },
        signInButtonTextStyle: {
            fontFamily: theme.fonts.semiBold,
            fontSize: 14,
            color: theme.colors.tertiary,
        },
    });

    return styles;
};

export default RegisterScreen;
