import {Alert} from 'react-native';
import {getData, removeData, storeData} from './dataStorageService';
import {UserAccount} from '../entities/user';

const getCurrentUser = async () => {
    return await getData('current_user')
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  
const updateUser = async (user: UserAccount | null) => {
  await storeData('current_user', user)
    .catch(error => {
      Alert.alert(error.message);
    });
};

const updateUserPicture = async (user: UserAccount | null) => {
  await storeData('current_user', user)
    .catch(error => {
      Alert.alert(error.message);
    });


};

const deleteUser = async () => {
  await removeData('current_user')
    .catch(error => {
      Alert.alert(error.message);
    });
};

const userService = {
  getCurrentUser,
  updateUser,
  updateUserPicture,
  deleteUser,
};

export default userService;
