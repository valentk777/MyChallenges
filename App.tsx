import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext, ThemeProvider } from './src/contexts/themeContext';
import { AuthorizationContextProvider, useAuthorizationContext } from './src/contexts/authorizationContext';
import { LoginScreen } from './src/screen/loginScreen';
import Menu from './src/components/Menu/Menu';
import { AddChallengeScreen } from './src/screen/addChallengeScreen';
import { ChallengeScreen } from './src/screen/challengeScreen';
import { Challenge } from './src/entities/challenge';

export type RootStackParamList = {
  Login: {};
  Home: {};
  CreateNewChallenge: {};
  Challenge: { challenge: Challenge };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider>
      <AuthorizationContextProvider>
        <AppComponent />
      </AuthorizationContextProvider>
    </ThemeProvider>
  );
};

export const AppComponent = () => {
  const { theme } = useContext(ThemeContext);
  const { isSignedIn } = useAuthorizationContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.white,
          },
          headerTitleAlign: 'center',
        }}
      >
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={Menu}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateNewChallenge"
              component={AddChallengeScreen}
            />
            <Stack.Screen
              name="Challenge"
              component={ChallengeScreen}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
