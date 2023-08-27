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
};

const HomeTab = createBottomTabNavigator<HomeStackParamList>();

// TODO: move to separate file
const CustomTabBarIcon = ({ focused, styles, theme, text, iconName }) => (
  <View style={styles.menuBar}>
    <Image
      source={require(`../../assets/icons/${iconName}`)}
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
      {text}
    </Text>
  </View>
);

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
            <CustomTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"ACTIVE"}
              iconName={"bars-staggered.png"}
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
            <CustomTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"TOP"}
              iconName={"heart.png"}
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
            <CustomTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"DONE"}
              iconName={"read.png"}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              styles={styles}
              theme={theme}
              text={"USER"}
              iconName={"user.png"}
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
