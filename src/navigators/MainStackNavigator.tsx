import React, { createNativeStackNavigator } from "@react-navigation/native-stack"
import Menu from "./MenuTabNavigator"
import AddTotalCounterChallengeScreen from "../screens/challenges/addTotalCounterChallengeScreen"
import TotalCounterChallengeScreen from "../screens/challenges/totalCounterChallengeScreen"
import { DailyCalendarChallenge, TotalCounterChallenge } from "../entities/challenge";
import AddDailyCalendarChallengeScreen from "../screens/challenges/addDailyCalendarChallengeScreen";
import DailyCalendarChallengeScreen from "../screens/challenges/dailyCalendarChallengeScreen";
import { ChallengeTypes } from "../entities/challengeTypes";

export type MainStackParamList = {
  HomeTab: {};
  AddTotalCounterChallengeScreen: { challengeType: ChallengeTypes, isDetailedCount: boolean };
  TotalCounterChallengeScreen: { challenge: TotalCounterChallenge };
  AddDailyCalendarChallengeScreen: { challengeType: ChallengeTypes, };
  DailyCalendarChallengeScreen: { challenge: DailyCalendarChallenge };
};

const MainStack = createNativeStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeTab">
      <MainStack.Screen
        name="HomeTab"
        component={Menu}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="AddTotalCounterChallengeScreen"
        component={AddTotalCounterChallengeScreen}
      />
      <MainStack.Screen
        name="TotalCounterChallengeScreen"
        component={TotalCounterChallengeScreen}
      />
      <MainStack.Screen
        name="AddDailyCalendarChallengeScreen"
        component={AddDailyCalendarChallengeScreen}
      />
      <MainStack.Screen
        name="DailyCalendarChallengeScreen"
        component={DailyCalendarChallengeScreen}
      />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator
