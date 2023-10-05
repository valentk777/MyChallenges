import {Alert} from 'react-native';
import {Challenge} from '../entities/challenge';
import {getData, storeData} from './dataStorageService';
import userService from './userService';
import challengesDbTable from '../external/database/challengesDbTable';

const initChallengesList = async (userId: string) => {
  const response = await challengesDbTable.getChallenges(userId);
  let challenges = [] as Challenge[];

  if (response.isSuccessfull) {
    challenges = response.result as Challenge[];
  }

  await storeData('challenges', challenges);

  return challenges;
};

const getChallengesKey = (userId: string) => {
  return `challenges/${userId}`;
};

const getAllChalenges = async () => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      return [] as Challenge[];
    }

    const challenges = await getData(getChallengesKey(user.id));

    if (challenges === null) {
      return await initChallengesList(user.id);
    }

    return challenges as Challenge[];
  } catch (error) {
    Alert.alert(`Issues getting all challenges: Error: ${error}`);
    return [] as Challenge[];
  }
};

const getChallengeById = (challenges: Challenge[], challengeId: string) => {
  if (challenges.length == 0) {
    return null;
  }

  const selectedChallenge = challenges.filter(
    challenge => challenge.id === challengeId,
  );

  if (selectedChallenge.length === 0) {
    return null;
  }

  if (selectedChallenge.length > 1) {
    Alert.alert('More than one challege with same id found');
  }

  return selectedChallenge[0];
};

const storeChallenge = async (challenge: Challenge) => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      console.error('Cannot store challenge because user does not exist');
      return false;
    }

    let challenges = await getAllChalenges();
    const selectedChallenge = getChallengeById(challenges, challenge.id);

    if (selectedChallenge != null) {
      // remove challenge to prevent from duplicates
      challenges = challenges.filter(
        localChallenge => challenge.id !== localChallenge.id,
      );
    }

    challenges.push(challenge);

    storeData(getChallengesKey(user.id), challenges);
    challengesDbTable.updateDbStoredChallenges(user.id, challenges);

    return true;
  } catch (error) {
    Alert.alert(`Issues adding new challenge: Error: ${error}`);
    return false;
  }
};

const removeChallenge = async (challengeId: string) => {
  try {
    const user = await userService.getCurrentUser();

    if (user === null || user.id === '' || user.id === null) {
      console.log('Cannot remove challenge because user does not exist');
      return false;
    }

    const challenges = await getAllChalenges();

    const updatedChallenges = challenges.filter(
      challenge => challenge.id !== challengeId,
    );

    storeData(getChallengesKey(user.id), updatedChallenges);
    challengesDbTable.updateDbStoredChallenges(user.id, updatedChallenges);

    return true;
  } catch (error) {
    Alert.alert(`Issues removing challenge: Error: ${error}`);
    return false;
  }
};

const getPercentage = (
  currentValue: number,
  initialValue: number,
  targetValue: number,
) => {
  const isPositiveCounting = initialValue <= targetValue;

  const currentDiff = isPositiveCounting
    ? currentValue - initialValue
    : initialValue - currentValue;

  let percentage = (currentDiff / Math.abs(targetValue - initialValue)) * 100;
  percentage =
    Number(targetValue) === 0 || targetValue === undefined ? 0 : percentage;
  percentage = percentage > 100 ? 100 : percentage;
  percentage = Math.floor(percentage);

  return percentage;
};

const challengesService = {
  getAllChalenges,
  storeChallenge,
  removeChallenge,
  getPercentage,
};

export default challengesService;
