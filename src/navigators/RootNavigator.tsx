import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthStackNavigator from "./AuthStackNavigator"
import MainStackNavigator from "./MainStackNavigator";
import { useAuth } from "../hooks/useAuth";
import { Keyboard } from "react-native";

export type RootStackParamList = {
  SplashScreen: {};
  AuthStack: {};
  MainStack: {};
};

const Root = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const { state } = useAuth();

  useEffect(() => {
    setAppState();
  }, [state])

  const setAppState = async () => {
    if (state.isAuthenticated) {
      Keyboard.dismiss();
    }
  }

  const renderScreenChange = () => {
    if (state?.isAuthenticated) {
      return (
        <Root.Screen name="MainStack" component={MainStackNavigator} />
      );
    } else {
      return (
        <Root.Screen name="AuthStack" component={AuthStackNavigator} />
      );
    }
  };

  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
    >
      {renderScreenChange()}
      {/* <Root.Screen name="LoadScreen" component={LoadScreen} /> */}
      {/* // NOTE: add hello screen with animations for loged in users or for the ones that already completed login */}
      {/* <Root.Screen name="Walkthrough" component={WalkthroughScreen} />  */}
      {/* <Root.Screen name="AuthStack" component={AuthStackNavigator} />
      <Root.Screen name="MainStack" component={MainStackNavigator} /> */}
    </Root.Navigator>
  )
}

export default RootNavigator
