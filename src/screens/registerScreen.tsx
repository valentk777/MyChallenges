import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, ViewStyle, TextStyle, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { AuthStackParamList } from '../navigators/AuthStackNavigator';
import { useAuth } from '../hooks/useAuth';
import { LoginUser } from '../entities/user';
import { GoogleSignInButton } from '../components/ButtonWrapper/GoogleSignInButton';

interface RegisterScreenProps
    extends NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'> {
}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);

    const { createUser, loginOrSignUpWithGoogle } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        navigation.navigate("SingInScreen", {});
    }

    const handleRegisterButton = () => {
        const userCandidate = {} as LoginUser;
        userCandidate.email = email;
        userCandidate.password = password;

        createUser(userCandidate);
    }

    const renderHeaderTextContainer = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.titleTextStyle}>
                Create Your Account
            </Text>
            <View style={{ marginTop: 16 }}>
                <Text style={styles.descriptionTextStyle}>
                    Please fill in the form to continue
                </Text>
            </View>
        </View>
    );

    const renderTextInputContainer = () => (
        <View style={styles.textInputContainer}>
            {/* <TextInput
                placeholder="Your name"
                placeholderTextColor="#6C6D72"
                style={styles.textInputStyle}
                onChangeText={setName}
            /> */}
            <TextInput
                placeholder="Email Address"
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
        </View>
    );

    const renderRegisterButton = () => (
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
    );

    const renderSignInTextContainer = () => (
        <View style={styles.signInButtonContainer}>
            <Text style={[styles.signInQuestionTextStyle]}>
                Have An Account?
            </Text>
            <TouchableOpacity
                style={styles.signInButtonStyle}
                onPress={() => handleSignIn()}
            >
                <Text style={styles.signInButtonTextStyle}>
                    Sign In
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
                <SafeAreaView style={styles.mainContainer}>
                    {renderHeaderTextContainer()}
                    {renderTextInputContainer()}
                    <GoogleSignInButton text="Sign In With Google" onGoogleSignPress={loginOrSignUpWithGoogle} />
                </SafeAreaView>
                <View
                    style={{
                        position: "absolute",
                        bottom: 8,
                    }}
                >
                    {renderRegisterButton()}
                    {renderSignInTextContainer()}
                </View>
            </LinearGradient>
        </View >
    );
};

interface Style {
    mainContainer: ViewStyle;
    headerContainer: ViewStyle;
    titleTextStyle: TextStyle;
    descriptionTextStyle: TextStyle;
    textInputContainer: ViewStyle;
    textInputStyle: TextStyle;
    registerButtonContainer: ViewStyle;
    registerButtonStyle: ViewStyle;
    registerButtonTextStyle: TextStyle;
    buttonContainer: ViewStyle;
    signInQuestionTextStyle: TextStyle;
    signInButtonStyle: ViewStyle;
    signInButtonTextStyle: TextStyle;
    signInButtonContainer: ViewStyle;

    container: ViewStyle;
    linearGradient: any;
    section: ViewStyle;
    text: ViewStyle;
}

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');


const createStyles = (theme: typeof customTheme) => {
    const styles = StyleSheet.create<Style>({
        mainContainer: {
            flex: 1,
            alignItems: 'center',
            // backgroundColor: '#181A1F',
        },
        headerContainer: {
            marginTop: 24,
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleTextStyle: {
            fontSize: 24,
            color: '#fff',
            fontWeight: '600',
        },
        descriptionTextStyle: {
            fontSize: 15,
            color: '#696A6F',
        },
        textInputContainer: {
            marginTop: 32,
            width: ScreenWidth * 0.85,
        },
        textInputStyle: {
            height: 55,
            marginBottom: 8,
            fontSize: 16,
            paddingLeft: 32,
            backgroundColor: '#262A34',
            color: '#fff',
            borderRadius: 16,
        },
        registerButtonContainer: {
            marginTop: ScreenHeight * 0.32,
            width: ScreenWidth * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        registerButtonStyle: {
            backgroundColor: '#5467FF',
            width: ScreenWidth * 0.85,
            height: 55,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        registerButtonTextStyle: {
            fontSize: 14,
            color: '#fff',
            fontWeight: '600',
        },
        buttonContainer: {
            position: 'absolute',
            bottom: 70,
            height: 100,
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        signInQuestionTextStyle: {
            fontSize: 14,
            color: '#fff',
        },
        signInButtonStyle: {
            height: 40,
            justifyContent: 'center',
            marginLeft: 8,
        },
        signInButtonTextStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#519bf4',
        },
        signInButtonContainer: {
            marginTop: 8,
            width: ScreenWidth * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },

        container: {
            flex: 1,
        },
        linearGradient: {
            flex: 15,
            colors: [theme.colors.primary, theme.colors.secondary],
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

export default RegisterScreen;
