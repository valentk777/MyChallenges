import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/login/registerScreen';
import { SignInScreen } from '../screens/login/signInScreen';
import LoginScreen from '../screens/login/loginScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  SignInScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
