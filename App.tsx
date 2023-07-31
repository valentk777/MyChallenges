import React, { useContext } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/loginScreen';
import { ChallengesScreen } from './src/screens/challengesScreen';
import { ChallengeScreen } from './src/screens/challengeScreen';
import { AddChallengeScreen } from './src/screens/addChallengeScreen';
import { ThemeContext, ThemeProvider } from './src/contexts/themeContext';
import { AddButton } from './src/components/AddButton/AddButton';
import { EditButton } from './src/components/EditButton/EditButton';
import { DeleteButton } from './src/components/DeleteButton/DeleteButton';
import { Challenge } from './src/entities/challenge';
import {
  AuthorizationContextProvider,
  useAuthorizationContext,
} from './src/contexts/authorizationContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type HomeStackParamList = {
  Challenges: undefined;
  Challenge: { challenge: Challenge };
  AddChallenge: undefined;
  EditButton: { challenge: Challenge };
  DeleteButton: { challenge: Challenge };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeStackParamList>();

const App = () => {
  return (
    <ThemeProvider>
      <AuthorizationContextProvider>
        <AppComponent />
      </AuthorizationContextProvider>
    </ThemeProvider>
  );
};

function HomeStack() {
  const { isDarkMode, theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.secondary,
        },
        headerTitleAlign: 'center',

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: theme.colors.secondary,
        tabBarInactiveBackgroundColor: theme.colors.secondary,
      }}>
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        // options={({ navigation }) => ({
        //   headerRight: () => (
        //     <AddButton onPress={() => navigation.navigate('Create new challenge')} />
        //   ),
          // headerLeft: () => (
          //   <Image
          //   source={require('./src/assets/logo_500x500.png')}
          // />
          // ),
        // })}
      />
      <Tab.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{
          headerShown: false,
          // tabBarIcon: ({ focused, size }) => null, // Hide the icon
          tabBarButton: () => null, // Hide the tab bar button
        }}
      />
      <Tab.Screen
        name="Create new challenge"
        component={AddChallengeScreen}
      />
            {/* <Tab.Screen
        name="User"
        component={UserScreen}
      /> */}
    </Tab.Navigator>
  );
}

export const AppComponent = () => {
  const { isDarkMode, theme, toggleTheme } = useContext(ThemeContext);
  const { isSignedIn } = useAuthorizationContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTitleAlign: 'center',
        }}>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeStack}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
