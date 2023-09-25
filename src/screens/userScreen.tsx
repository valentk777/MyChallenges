import React, { useContext } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { useAuth } from '../hooks/useAuth';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { icons } from '../assets';

export const UserScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.6, 1]}
        style={styles.linearGradient}
      >
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOut} onPress={() => signOut(user.id)}>
            <Image
              source={icons['logout.png']}
              resizeMode="contain"
              style={styles.signOut}
            />
          </TouchableOpacity>
          <Text style={styles.text}>User information screen.</Text>
          <Text style={styles.text}>{user?.email}</Text>
          <Text style={styles.text}>{user?.createdAt}</Text>
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
      flex: 15,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary],
    },
    signOut: {
      tintColor: theme.colors.white,
      position: 'absolute',
      top: 15,
      right: 15,
      height: 30,
      width: 30,
    },
    section: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    text: {
      fontSize: 20,
      lineHeight: 21,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 30,
    },
    buttonContainer: {
      margin: 20,
    },
  });

  return styles;
};

export default UserScreen;
