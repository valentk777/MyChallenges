import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChallengesScreen from '../../screen/challengesScreen';
import { UserScreen } from '../../screen/userScreen';
import { CreateNewChallengeButton } from '../CreateNewChallengeButton/CreateNewChallengeButton';
import CompletedChallengesScreen from '../../screen/completedChallengesScreen';
import FavoriteChallengesScreenScreen from '../../screen/favoriteChallengesScreen';

export type HomeStackParamList = {
  Challenges: {};
  FavoriteChallenges: {};
  CreateNewChallengeStack: {};
  CompletedChallenges: {};
  User: {};

  // Challenge: { challenge: Challenge };
  // AboutUs: {};
  // EditButton: { challenge: Challenge };
  // DeleteButton: { challenge: Challenge };
};

const HomeTab = createBottomTabNavigator<HomeStackParamList>();

const Menu = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.menuBox,
          ...styles.shadow,
        }
      }}
    >
      <HomeTab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuBar}>
              {/* <Image
                source={require('../../assets/icons/bars-staggered.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                  ...styles.menuIcon
                }}
              /> */}
              <Text style={{
                color: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                ...styles.menuText,
              }}>
                ACTIVE
              </Text>
            </View>
          ),
        }}
      />
      {/* o gal tiesiog bendrame liste parodyt juos auksciau? */}
      <HomeTab.Screen
        name="FavoriteChallenges"
        component={FavoriteChallengesScreenScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuBar}>
              <Image
                source={require('../../assets/icons/heart.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                  ...styles.menuIcon
                }}
              />
              <Text style={{
                color: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                ...styles.menuText,
              }}>
                TOP
              </Text>
            </View>
          ),
        }}
      />
      <HomeTab.Screen
        name="CreateNewChallengeStack"
        component={CreateNewChallengeButton}
        options={{
          tabBarStyle: {
            display: "none"
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/plus.png')}
              resizeMode="contain"
              style={styles.createNewIcon}
            />
          ),
          tabBarButton: (props) => (
            <CreateNewChallengeButton {...props} />
          ),
          headerShown: true,
        }}
      />
      <HomeTab.Screen
        name="CompletedChallenges"
        component={CompletedChallengesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuBar}>
              <Image
                source={require('../../assets/icons/read.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                  ...styles.menuIcon
                }}
              />
              <Text style={{
                color: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                ...styles.menuText,
              }}>
                DONE
              </Text>
            </View>
          ),
        }}

      />
      {/* TODO: add about us and settings under uder in a top corner */}
      {/* <HomeTab.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuBar}>
              <Image
                source={require('../../assets/icons/list.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                  ...styles.menuIcon
                }}
              />
              <Text style={{
                color: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                ...styles.menuText,
              }}>
                HOME
              </Text>
            </View>
          ),
        }}
      /> */}
      <HomeTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.menuBar}>
              <Image
                source={require('../../assets/icons/user.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                  ...styles.menuIcon
                }}
              />
              <Text style={{
                color: focused ? theme.colors.focused : theme.colors.menuNotFocused,
                ...styles.menuText,
              }}>
                USER
              </Text>
            </View>
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    menuBox: {
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
      elevation: 0,
      backgroundColor: theme.colors.white,
      borderRadius: 15,
      height: 90,
    },
    shadow: {
      shadowColor: theme.colors.input,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 10,
      }
    },
    menuBar: {
      alignItems: 'center',
      justifyContent: 'center',
      top: 5,
    },
    menuIcon: {
      width: 25,
      height: 25,
      bottom: 5,
    },
    createNewIcon: {
      width: 30,
      height: 30,
      tintColor: theme.colors.white,
    },
    menuText: {
      fontSize: 10,
    },
  });

  return styles;
};

export default Menu;
