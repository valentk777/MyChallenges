import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Menu from "./MenuTabNavigator"
import AddChallengeScreen from "../screens/addChallengeScreen"
import ChallengeScreen from "../screens/challengeScreen"
import { Challenge } from "../entities/challenge";

export type MainStackParamList = {
    HomeTab: {};
    CreateNewChallengeScreen: {};
    ChallengeScreen: { challenge: Challenge };
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
                name="CreateNewChallengeScreen"
                component={AddChallengeScreen}
                options={{ title: 'Create new challenge' }}
            />
            <MainStack.Screen
                name="ChallengeScreen"
                component={ChallengeScreen}
                options={{ title: 'Challenge' }}
            />
        </MainStack.Navigator>
    )
}

export default MainStackNavigator
