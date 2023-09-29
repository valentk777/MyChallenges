import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { useAuth } from '../hooks/useAuth';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { icons, logo } from '../assets';
import { CircleButton } from '../components/ButtonWrapper/CircleButton';
import timeService from '../services/timeService';

export const UserScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth()

  const renderHeaderContainer = () => (
    <View style={styles.headerContainer}>
      <Image
        style={styles.headerImage}
        source={logo['logo_500x500.png']}
      />
      <Text style={styles.titleTextStyle}>User information</Text>
    </View>
  );

  const userEmail = user?.email === null || user.email === ""
    ? "Login without email"
    : user.email;

  const userCreated = timeService.convertUTCToLocalTime(user.createdAt);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.6, 1]}
        style={styles.linearGradient}
      >
        <View style={styles.section}>
          <CircleButton
            imgUrl={icons["logout.png"]}
            onPress={() => signOut(user.id)}
            style={[styles.signOut, theme.shadows.dark]}
          />
          {renderHeaderContainer()}
          <View style={styles.userInfoContainer}>
            <Text style={styles.textPrimary}>User email: </Text>
            <Text style={styles.textSecondary}>    {userEmail}</Text>
            <Text style={styles.textPrimary}>User created: </Text>
            <Text style={styles.textSecondary}>    {userCreated}</Text>
          </View>
        </View>
      </LinearGradient>
    </View >
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearGradient: {
      flex: 1,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary],
    },
    signOut: {
      tintColor: theme.colors.white,
      position: 'absolute',
      top: 30,
      right: 30,
      height: 50,
      width: 50,
    },
    section: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    headerContainer: {
      width: '100%',
      flex: 2,
      alignItems: "center",
      justifyContent: 'space-evenly',
    },
    headerImage: {
      width: '30%',
      height: undefined,
      aspectRatio: 1,
    },
    titleTextStyle: {
      fontFamily: theme.fonts.bold,
      fontSize: 25,
      color: theme.colors.white,
      fontWeight: "600",
    },
    userInfoContainer: {
      flex: 3,
      width: "70%",
      alignItems: "flex-start",
    },
    textPrimary: {
      fontSize: 21,
      lineHeight: 21,
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.text,
      marginBottom: 10,
    },
    textSecondary: {
      fontSize: 18,
      lineHeight: 18,
      fontFamily: theme.fonts.light,
      color: theme.colors.text,
      marginBottom: 30,
    }
  });

  return styles;
};

export default UserScreen;
