import firestore from '@react-native-firebase/firestore';
import {AppResponse} from '../../entities/appResponse';
import {UserAccount} from '../../entities/user';

export const challengesRef = firestore().collection('challenges');

// TODO: rename, improve
const getUnixTimeStamp = () => {
  return new Date().toISOString();
};

export const addNewUser = async (user: UserAccount) => {
  const dataWithOnlineStatus = {
    ...user,
    lastOnlineTimestamp: getUnixTimeStamp(),
  };

  try {
    await challengesRef.doc(user.id).set(dataWithOnlineStatus, {merge: true});
    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updateUser = async (user: UserAccount) => {
  const dataWithOnlineStatus = {
    ...user,
    lastOnlineTimestamp: getUnixTimeStamp(),
  };

  try {
    await challengesRef.doc(user.id).update(dataWithOnlineStatus);
    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.log(error);
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const getUserByID = async (userID: string) => {
  try {
    const document = await challengesRef.doc(userID).get();

    if (document?.exists) {
      return document.data() as UserAccount;
    }

    return null;
  } catch (error) {
    console.log('getUserByID', error);
    return null;
  }
};

export const updateProfilePhoto = async (
  userID: string,
  profilePictureURL: string,
) => {
  try {
    await challengesRef.doc(userID).update({profilePictureURL: profilePictureURL});
    return {success: true};
  } catch (error) {
    console.log(error);
    return {error: error};
  }
};

const challengesDbTable = {
  addNewUser,
  updateUser,
  getUserByID,
  updateProfilePhoto,
};

export default challengesDbTable;
