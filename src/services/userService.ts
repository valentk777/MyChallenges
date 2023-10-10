import {Alert} from 'react-native';
import {getData, removeData, storeData} from './dataStorageService';
import {UserAccount} from '../entities/user';
import userDbTable from '../external/database/userDbTable';

const getCurrentUser = async (): Promise<UserAccount> => {
  return await getData('current_user').catch(error => {
    Alert.alert(error.message);
  });
};

const updateUser = async (user: UserAccount | null) => {
  await storeData('current_user', user).catch(error => {
    Alert.alert(error.message);
  });
};

const updateUserPicture = async (userPicture: string) => {
  const user = await getCurrentUser();
  user.profilePictureURL = userPicture;

  // TODO: uploade image to assets and asing new url from here.
  // TODO: then update remote user storage

  await storeData('current_user', user).catch(error => {
    Alert.alert(error.message);
  });

  await userDbTable.updateUser(user).catch(error => {
    Alert.alert(error.message);
  });
};

const updateUserTheme = async (theme: string) => {
  const user = await getCurrentUser();
  user.theme = theme;

  await storeData('current_user', user).catch(error => {
    Alert.alert(error.message);
  });

  await userDbTable.updateUser(user).catch(error => {
    Alert.alert(error.message);
  });
};

const updateUserLanguage = async (language: string) => {
  const user = await getCurrentUser();
  user.language = language;

  await storeData('current_user', user).catch(error => {
    Alert.alert(error.message);
  });

  await userDbTable.updateUser(user).catch(error => {
    Alert.alert(error.message);
  });
};

const deleteUser = async () => {
  await removeData('current_user').catch(error => {
    Alert.alert(error.message);
  });
};

const userService = {
  getCurrentUser,
  updateUser,
  updateUserPicture,
  updateUserTheme,
  updateUserLanguage,
  deleteUser,
};

export default userService;
