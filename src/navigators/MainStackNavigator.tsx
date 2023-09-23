import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Menu from "./MenuTabNavigator"
import AddChallengeScreen from "../screens/addChallengeScreen"
import ChallengeScreen from "../screens/challengeScreen"
import { Challenge } from "../entities/challenge";

export type MainStackParamList = {
    Home: {};
    CreateNewChallenge: {};
    Challenge: { challenge: Challenge };
};

const MainStack = createNativeStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
    //   const { localized } = useTranslations()

    return (
        <MainStack.Navigator
            screenOptions={{
                // headerBackTitleVisible: false,
                // headerBackTitle: localized('Back'),
            }}
            initialRouteName="Home">
            <MainStack.Screen
                name="Home"
                component={Menu}
                options={{
                    headerShown: false,
                }}
            />
            <MainStack.Screen
                name="CreateNewChallenge"
                component={AddChallengeScreen}
            />
            <MainStack.Screen
                name="Challenge"
                component={ChallengeScreen}
            />
        </MainStack.Navigator>
    )
}

export default MainStackNavigator
