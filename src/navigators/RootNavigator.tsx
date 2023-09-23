import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthStackNavigator from "./AuthStackNavigator"
import MainStackNavigator from "./MainStackNavigator";
import LoadScreen from "../screens/loadScreen";

export type RootStackParamList = {
  LoadScreen: {};
  AuthStack: {};
  MainStack: {};
};

const Root = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoadScreen">
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      {/* <Root.Screen name="Walkthrough" component={WalkthroughScreen} /> */}
      <Root.Screen name="AuthStack" component={AuthStackNavigator} />
      <Root.Screen name="MainStack" component={MainStackNavigator} />
    </Root.Navigator>
  )
}

export default RootNavigator
