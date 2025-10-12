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
import { Challenge } from '../../entities/challenge';
import timeService from '../../services/timeService';

const app = getApp();
const db = getFirestore(app);
const challengesCollection = collection(db, 'challenges');

type ChallengeDoc = {
  challenges: Challenge[];
  lastTimeUpdated: string;
};

export const getChallenges = async (userId: string): Promise<AppResponse> => {
  try {
    const userDocRef = doc(challengesCollection, userId);
    const response = await getDoc<ChallengeDoc>(userDocRef);

    if (response.exists()) {
      const challenges = response.data()?.challenges;

      if (challenges === undefined) {
        return { isSuccessfull: true, result: [], error: null };
      }

      return {
        isSuccessfull: true,
        result: challenges,
        error: null,
      };
    } else {
      await addNewDbChallenges(userId);

      return { isSuccessfull: true, result: [], error: null };
    }
  } catch (error) {
    console.error(error);

    return { isSuccessfull: false, result: null, error: error };
  }
};

export const addNewDbChallenges = async (
  userId: string,
): Promise<AppResponse> => {
  try {
    const dataWithOnlineStatus: ChallengeDoc = {
      challenges: [],
      lastTimeUpdated: timeService.getCurrentDateString(),
    };

    const userDocRef = doc(challengesCollection, userId);
    await setDoc(userDocRef, dataWithOnlineStatus, { merge: true });

    return { isSuccessfull: true, result: null, error: null };
  } catch (error) {
    console.log(error);

    return { isSuccessfull: false, result: null, error: error };
  }
};

export const updateDbStoredChallenges = async (
  userId: string,
  challenges: Challenge[],
): Promise<AppResponse | void> => {
  if (userId === undefined || userId === '' || userId == null) {
    console.log('Cannot save to remote database');

    return;
  }

  const dataWithOnlineStatus: ChallengeDoc = {
    challenges: challenges,
    lastTimeUpdated: timeService.getCurrentDateString(),
  };

  try {
    const userDocRef = doc(challengesCollection, userId);
    await updateDoc(userDocRef, dataWithOnlineStatus);

    return { isSuccessfull: true, result: null, error: null };
  } catch (error) {
    console.log(error);

    return { isSuccessfull: false, result: null, error: error };
  }
};

const challengesDbTable = {
  getChallenges,
  addNewDbChallenges,
  updateDbStoredChallenges,
};

export default challengesDbTable;
