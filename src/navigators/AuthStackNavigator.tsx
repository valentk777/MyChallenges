import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/login/registerScreen';
import { SingInScreen } from '../screens/login/signInScreen';
import LoginScreen from '../screens/login/loginScreen';

export type AuthStackParamList = {
  LoginScreen: {};
  RegisterScreen: {};
  SingInScreen: {};
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
      initialRouteName="LoginScreen">
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <AuthStack.Screen
        name="SingInScreen"
        component={SingInScreen}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator;
