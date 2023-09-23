import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChallengesScreen from '../screens/challengesScreen';
import { UserScreen } from '../screens/userScreen';
import { CreateNewChallengeButton } from '../components/CreateNewChallengeButton/CreateNewChallengeButton';
import CompletedChallengesScreen from '../screens/completedChallengesScreen';
import FavoriteChallengesScreenScreen from '../screens/favoriteChallengesScreen';
import { MenuTabBarIcon } from '../components/Menu/MenuTabBarIcon';

export type HomeStackParamList = {
  Challenges: {};
  FavoriteChallenges: {};
  CreateNewChallengeStack: {};
  CompletedChallenges: {};
  User: {};
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
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"ACTIVE"}
              iconUrl={require("../assets/icons/bars-staggered.png")}
            />
          ),
        }}
      />

      {/* o gal tiesiog bendrame liste parodyt juos auksciau? */}
      <HomeTab.Screen
        name="FavoriteChallenges"
        component={FavoriteChallengesScreenScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"TOP"}
              iconUrl={require("../assets/icons/heart.png")}
            />
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
              source={require('../assets/icons/plus.png')}
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
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"DONE"}
              iconUrl={require("../assets/icons/read.png")}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MenuTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"USER"}
              iconUrl={require("../assets/icons/user.png")}
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
