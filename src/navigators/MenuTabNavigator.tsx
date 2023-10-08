import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { customTheme } from '../styles/customTheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChallengesScreen from '../screens/challengesScreen';
import { UserScreen } from '../screens/userScreen';
import { AddChallengeSelectionMenu } from '../components/Menu/AddChallengeSelectionMenu';
import CompletedChallengesScreen from '../screens/completedChallengesScreen';
import FavoriteChallengesScreenScreen from '../screens/favoriteChallengesScreen';
import { MenuTabBarIcon } from '../components/Menu/MenuTabBarIcon';
import { icons } from '../assets';

export type HomeStackParamList = {
  ChallengesScreen: {};
  FavoriteChallengesScreen: {};
  CreateNewChallengeButton: {};
  CompletedChallengesScreen: {};
  UserScreen: {};
};

const HomeTab = createBottomTabNavigator<HomeStackParamList>();

const Menu = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.menuBox,
          ...theme.shadows.primary,
        }
      }}
    >
      <HomeTab.Screen
        name="ChallengesScreen"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"ACTIVE"}
              iconUrl={icons['bars-staggered.png']}
            />
          ),
        }}
      />

      {/* o gal tiesiog bendrame liste parodyt juos auksciau? */}
      <HomeTab.Screen
        name="FavoriteChallengesScreen"
        component={FavoriteChallengesScreenScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"TOP"}
              iconUrl={icons['heart-full.png']}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="CreateNewChallengeButton"
        component={AddChallengeSelectionMenu}
        options={{
          tabBarStyle: {
            display: "none"
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons['plus.png']}
              resizeMode="contain"
              style={styles.createNewIcon}
            />
          ),
          tabBarButton: (props) => (
            <AddChallengeSelectionMenu {...props} />
          ),
          headerShown: true,
        }}
      />
      <HomeTab.Screen
        name="CompletedChallengesScreen"
        component={CompletedChallengesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"DONE"}
              iconUrl={icons['read.png']}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"USER"}
              iconUrl={icons['user.png']}
            />
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
