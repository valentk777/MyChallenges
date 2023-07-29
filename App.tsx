import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './src/screens/loginScreen';
import {ChallengesScreen} from './src/screens/challengesScreen';
import {ChallengeScreen} from './src/screens/challengeScreen';
import {AddChallengeScreen} from './src/screens/addChallengeScreen';
import {ThemeContext, ThemeProvider} from './src/contexts/themeContext';
import {AddButton} from './src/components/AddButton/AddButton';
import {EditButton} from './src/components/EditButton/EditButton';
import {DeleteButton} from './src/components/DeleteButton/DeleteButton';
import {Challenge} from './src/entities/challenge';
import {
  AuthorizationContextProvider,
  useAuthorizationContext,
} from './src/contexts/authorizationContext';

export type RootStackParamList = {
  Login: undefined;
  Challenges: undefined;
  Challenge: {challenge: Challenge};
  AddChallenge: undefined;
  EditButton: {challenge: Challenge};
  DeleteButton: {challenge: Challenge};
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
  const {isDarkMode, theme, toggleTheme} = useContext(ThemeContext);
  const {isSignedIn} = useAuthorizationContext();

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
              name="Challenges"
              component={ChallengesScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <AddButton onPress={() => navigation.navigate('Create new challenge')} />
                ),
              })}
            />
            <Stack.Screen
              name="Challenge"
              component={ChallengeScreen}
            />
            <Stack.Screen
              name="Create new challenge"
              component={AddChallengeScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Challenge tracker"
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
