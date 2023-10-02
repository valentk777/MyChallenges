import React, { createNativeStackNavigator } from "@react-navigation/native-stack"
import Menu from "./MenuTabNavigator"
import AddTotalCounterChallengeScreen from "../screens/challenges/addTotalCounterChallengeScreen"
import TotalCounterChallengeScreen from "../screens/challenges/totalCounterChallengeScreen"
import { Challenge } from "../entities/challenge";

export type MainStackParamList = {
    HomeTab: {};
    AddTotalCounterChallengeScreen: {};
    TotalCounterChallengeScreen: { challenge: Challenge };
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
                options={{ title: 'Create new challenge' }}
            />
            <MainStack.Screen
                name="TotalCounterChallengeScreen"
                component={TotalCounterChallengeScreen}
                options={{ title: 'Challenge' }}
            />
        </MainStack.Navigator>
    )
}

export default MainStackNavigator
