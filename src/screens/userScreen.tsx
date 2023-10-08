import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../hooks/useAuth';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { icons, logo } from '../assets';
import { CircleButton } from '../components/ButtonWrapper/CircleButton';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import userService from '../services/userService';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../hooks/useTranslations';

export const UserScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [forceUpdate, setForceUpdate] = useState<number>(0);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  const userEmail = user?.email === null || user.email === "" ? t("default-user-email") : user.email;
  const userCreated = tTime(user.createdAt);

  if (user?.profilePictureURL === undefined || user?.profilePictureURL === null || user.profilePictureURL === "") {
    user.profilePictureURL = 'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';
  }

  // useEffect(() => {
  //   // Use the effect to re-render the component when the profilePicture state changes
  // }, [user]);

  const renderHeaderContainer = () => (
    <View style={styles.headerContainer}>
      <CircleButton
        imgUrl={icons["logout.png"]}
        onPress={() => signOut(user.id)}
        style={[styles.signOut, theme.shadows.dark]}
      />
      <Image style={styles.logo} source={logo['logo_500x500.png']} />
    </View>
  );

  const handleCameraPress = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        user.profilePictureURL = response.assets[0].uri;
        userService.updateUserPicture(user);
        setForceUpdate(prev => prev + 1);
      }
    });
  };

  const handleGalleryPress = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        user.profilePictureURL = response.assets[0].uri;
        userService.updateUserPicture(user);
        setForceUpdate(prev => prev + 1);
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.6, 1]}
        style={styles.linearGradient}
      >
        {renderHeaderContainer()}
        <View style={styles.section}>
          <View style={styles.userImageArea}>
            <View style={[styles.userImageShadowArea, theme.shadows.primary]}>
              <Image key={forceUpdate} style={styles.userImage} source={{ uri: user.profilePictureURL }} />
            </View>
            {/* <TouchableOpacity
              onPress={handleCameraPress}
              style={[styles.button, { left: 30 }]}
            >
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={icons['camera.png']} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGalleryPress}
              style={[styles.button, { right: 30 }]}
            >
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={icons['file.png']} />
            </TouchableOpacity> */}
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.textPrimary}>{t("user-language")}</Text>
            <View style={styles.languages}>
              <TouchableOpacity
                onPress={() => changeLanguage("en")}
                style={styles.languageButton}>
                <Text style={styles.textPrimary}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeLanguage("lt")}
                style={styles.languageButton}>
                <Text style={styles.textPrimary}>LT</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textPrimary}>{t("user-email")}</Text>
            <Text style={styles.textSecondary}>    {userEmail}</Text>
            <Text style={styles.textPrimary}>{t("user-created")}</Text>
            <Text style={styles.textSecondary}>    {userCreated}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
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
    button: {
      position: "absolute",
      backgroundColor: theme.colors.white,
      padding: 5,
      borderRadius: 500,
      height: 45,
      width: 45,
      alignItems: 'center',
      justifyContent: 'center',
      top: 200,
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: theme.colors.black,
    },
    signOut: {
      tintColor: theme.colors.white,
      top: 30,
      right: 30,
      height: 50,
      width: 50,
    },
    section: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 10,
    },
    headerContainer: {
      width: '100%',
      alignItems: "center",
      justifyContent: 'space-evenly',
    },
    logo: {
      position: 'absolute',
      top: 30,
      left: 30,
      height: 55,
      width: undefined,
      aspectRatio: 1,
    },
    titleTextStyle: {
      fontFamily: theme.fonts.bold,
      fontSize: 25,
      color: theme.colors.white,
      fontWeight: "600",
    },
    userInfoContainer: {
      flex: 5,
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
      fontSize: 15,
      lineHeight: 18,
      fontFamily: theme.fonts.light,
      color: theme.colors.text,
      marginBottom: 30,
    },
    userImageArea: {
      flex: 3,
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userImageShadowArea: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 145,
      width: undefined,
      aspectRatio: 1,
      borderRadius: 500,
    },
    userImage: {
      width: undefined,
      aspectRatio: 1,
      height: 130,
      borderRadius: 500,
    },
    languages: {
      flexDirection: 'row',
    },
    languageButton: {
      marginRight: 20,
      marginLeft: 20,
    },
  });

  return styles;
};

export default UserScreen;

