import {Alert} from 'react-native';
import {Challenge} from '../entities/challenge';
import {getData, storeData} from './dataStorageService';
import userService from './userService';
import challengesDbTable from '../external/database/challengesDbTable';
import uuid from 'react-native-uuid';
import { ProgressStatus } from '../entities/progressStatus';
import { ChallengeTypes } from '../entities/challengeTypes';
import timeService from './timeService';

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

const createNewChallenge = (
  title: string,
  description: string,
  initial: number,
  target: number,
  imageLocation: string,
  challengeType: ChallengeTypes,
) => {
  if (title === '') {
    Alert.alert('Title cannot be empty');
    return null;
  }

  if (title.length > 20) {
    Alert.alert('Title too long. Max 20 symbols allowed');
    return null;
  }

  if (description.length > 90) {
    Alert.alert('Description too long. Max 90 symbols allowed');
    return null;
  }

  if (isNaN(initial)) {
    Alert.alert('Initial value should be a number');
    return null;
  }

  if (initial < 0) {
    Alert.alert('Initial value should be positive');
    return null;
  }

  if (isNaN(target)) {
    Alert.alert('Target value should be a number');
    return null;
  }

  if (target <= 0) {
    Alert.alert('Target value should be positive');
    return null;
  }

  const currentUtcTime = timeService.getCurrentDateString();
  const challengeCandidate = {} as Challenge;

  challengeCandidate.id = uuid.v4().toString();
  challengeCandidate.title = title;
  challengeCandidate.description = description;
  challengeCandidate.initialValue = initial;
  challengeCandidate.currentValue = initial;
  challengeCandidate.targetValue = target;
  challengeCandidate.image = imageLocation;
  challengeCandidate.timeCreated = currentUtcTime;
  challengeCandidate.lastTimeUpdated = currentUtcTime;
  challengeCandidate.favorite = false;
  challengeCandidate.status = ProgressStatus.NotStarted;
  challengeCandidate.type = challengeType;

  return challengeCandidate;
};

const challengesService = {
  getAllChalenges,
  storeChallenge,
  removeChallenge,
  getPercentage,
  createNewChallenge,
};

export default challengesService;
