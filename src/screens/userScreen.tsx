import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../hooks/useAuth';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { icons, logo } from '../assets';
import { CircleButton } from '../components/ButtonWrapper/CircleButton';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import userService from '../services/userService';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../hooks/useTranslations';
import ThemesList from '../components/ThemesList/ThemesList';

export const UserScreen = () => {
  const { theme } = useTheme();
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

  const renderHeaderContainer = () => (
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={logo['logo_500x500.png']} />
      <CircleButton
        imgUrl={icons["logout.png"]}
        onPress={() => signOut(user.id)}
        style={[styles.signOut, theme.shadows.dark]}
      />
    </View>
  );

  const renderUserImageContainer = () => (
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
  );

  const renderUserInfoContainer = () => (
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
  );

  const renderUserThemeContainer = () => (
    <View style={styles.themeContainer}>
      <Text style={styles.textPrimary}>{t("user-theme")}</Text>
      <ThemesList />
    </View>
  );

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
          {renderUserImageContainer()}
          {renderUserInfoContainer()}
          {renderUserThemeContainer()}
        </View>
        <View style={styles.empty} />
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
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
      backgroundColor: theme.colors.canvas,
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
      tintColor: theme.colors.canvasInverted,
    },
    signOut: {
      tintColor: theme.colors.canvas,
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
      color: theme.colors.canvas,
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
      color: theme.colors.canvas,
      marginBottom: 10,
    },
    textSecondary: {
      fontSize: 15,
      lineHeight: 18,
      fontFamily: theme.fonts.light,
      color: theme.colors.canvas,
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
    themeContainer: {
      flex: 2,
      width: "70%",
    },
    empty: {
      flex: 2
    }
  });

  return styles;
};

export default UserScreen;

