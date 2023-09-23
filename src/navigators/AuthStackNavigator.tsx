import { StyleSheet, View } from 'react-native'
import LoginScreen from '../screens/loginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../hooks/useAuth'

export type AuthStackParamList = {
    LoginScreen: {};
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator = () => {
    const { isSignedIn } = useAuth();

    return (
        <AuthStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: false,
            }}
            initialRouteName="LoginScreen">
            <AuthStack.Screen
                // options={{ headerStyle: styles.headerStyle }}
                name= "LoginScreen"
                component={LoginScreen}
            />
        </AuthStack.Navigator>
    )
}

// const styles = StyleSheet.create({
//     headerStyle: {
//         // borderBottomWidth: 0,
//         // shadowColor: 'transparent',
//         // shadowOpacity: 0,
//         // elevation: 0, // remove shadow on Android
//     },
// })

export default AuthStackNavigator;
