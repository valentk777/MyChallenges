import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import { AppResponse } from '../../entities/appResponse';
import { UserAccount } from '../../entities/user';
import timeService from '../../services/timeService';

export type UserDoc = UserAccount & {
  lastOnlineTimestamp: string;
  profilePictureURL?: string | null;
};

const db = getFirestore(getApp());
const usersCollection = collection(db, 'users');

export const addNewUser = async (user: UserAccount): Promise<AppResponse> => {
  const dataWithOnlineStatus: UserDoc = {
    ...user,
    lastOnlineTimestamp: timeService.getCurrentDateString(),
  };

  try {
    const userDocRef = doc(usersCollection, user.id);
    await setDoc(userDocRef, dataWithOnlineStatus, { merge: true });

    return { isSuccessfull: true, result: dataWithOnlineStatus, error: null };
  } catch (error) {
    console.log(error);
    return { isSuccessfull: false, result: null, error };
  }
};

export const updateUser = async (user: UserAccount): Promise<AppResponse> => {
  const dataWithOnlineStatus: Partial<UserDoc> = {
    ...user,
    lastOnlineTimestamp: timeService.getCurrentDateString(),
  };

  try {
    const userDocRef = doc(usersCollection, user.id);
    await updateDoc(userDocRef, dataWithOnlineStatus);

    return { isSuccessfull: true, result: null, error: null };
  } catch (error) {
    console.log(error);
    return { isSuccessfull: false, result: null, error };
  }
};

export const getUserByID = async (
  userID: string,
): Promise<UserAccount | null> => {
  try {
    const userDocRef = doc(usersCollection, userID);
    const document = await getDoc<UserDoc>(userDocRef);

    if (document.exists()) {
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
): Promise<{ success?: boolean; error?: unknown }> => {
  try {
    const userDocRef = doc(usersCollection, userID);
    await updateDoc(userDocRef, { profilePictureURL });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const userDbTable = {
  addNewUser,
  updateUser,
  getUserByID,
  updateProfilePhoto,
};

export default userDbTable;
