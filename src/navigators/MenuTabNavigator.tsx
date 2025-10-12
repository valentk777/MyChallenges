import React from 'react';
import { StyleSheet, Image, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChallengesScreen from '../screens/challengesScreen';
import { UserScreen } from '../screens/userScreen';
import { AddChallengeSelectionMenu } from '../components/Menu/AddChallengeSelectionMenu';
import FavoriteChallengesScreenScreen from '../screens/favoriteChallengesScreen';
import { MenuTabBarIcon } from '../components/Menu/MenuTabBarIcon';
import { icons } from '../assets';
import { useTranslation } from 'react-i18next';
import StatusCalendarScreen from '../screens/calendarStatusScreen';

export type HomeStackParamList = {
  ChallengesScreen: undefined;
  FavoriteChallengesScreen: undefined;
  CreateNewChallengeButton: undefined;
  StatusCalendarScreen: undefined;
  UserScreen: undefined;
};

const HomeTab = createBottomTabNavigator<HomeStackParamList>();

const Menu = () => {
  const { theme } = useTheme();
  const window = useWindowDimensions();
  const styles = createStyles(theme);
  const { t } = useTranslation('menu-tab-navigator');

  return (
      <View style={{ height: window.height }}>
        <HomeTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              ...styles.menuBox,
              ...theme.shadows.primary,
            },
          }}
          safeAreaInsets={{ bottom: 0, top: 0, left:0, right: 0 }}
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
                  text={t('active')}
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
                  text={t('top')}
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
                display: 'none',
              },
              tabBarIcon: ({ focused }) => (
                <Image
                  source={icons['plus.png']}
                  resizeMode="contain"
                  style={styles.createNewIcon}
                />
              ),
              tabBarButton: props => <AddChallengeSelectionMenu {...props} />,
              headerShown: true,
            }}
          />
          <HomeTab.Screen
            name="StatusCalendarScreen"
            component={StatusCalendarScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <MenuTabBarIcon
                  focused={focused}
                  styles={styles}
                  theme={theme}
                  text={t('status')}
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
                  text={t('user')}
                  iconUrl={icons['user.png']}
                />
              ),
            }}
          />
        </HomeTab.Navigator>
      </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    menuBox: {
      position: 'absolute',
      bottom: 30,
      elevation: 0,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.canvas,
      borderRadius: 15,
      height: 80,
    },
    menuBar: {
      alignItems: 'center',
      width: 70,
      height: 80,
      justifyContent: 'center',
      top: 25,
    },
    menuIcon: {
      width: 25,
      height: 25,
      bottom: 5,    
    },
    createNewIcon: {
      width: 30,
      height: 30,
      tintColor: theme.colors.canvas,
    },
    menuText: {
      fontSize: 10,
      fontFamily: theme.fonts.medium,
    },
  });

  return styles;
};

export default Menu;
