import { StyleSheet, View } from 'react-native'
import LoginScreen from '../screens/loginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/registerScreen';
import { SingInScreen } from '../screens/signInScreen';

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
                name= "LoginScreen"
                component={LoginScreen}
            />
            <AuthStack.Screen
                name= "RegisterScreen"
                component={RegisterScreen}
            />
            <AuthStack.Screen
                name= "SingInScreen"
                component={SingInScreen}
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
