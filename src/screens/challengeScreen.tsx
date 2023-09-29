import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext, createContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SaveButton } from '../components/ButtonWrapper/SaveButton';
import { Quantity } from '../components/Quantity/Quantity';
import { NumericProgressTile } from '../components/Tile/NumericProgressTile';
import { ThemeContext } from '../contexts/themeContext';
import { Challenge } from '../entities/challenge';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { ProgressStatus } from '../entities/progressStatus';
import { MainStackParamList } from '../navigators/MainStackNavigator';
import challengesService from '../services/challengesService';
import { ChallengeHeader } from '../components/Menu/ChallengeHeader';

type ChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'ChallengeScreen'>;

interface ChallengeContextProvider {
  challenge: Challenge;
  newValue: number;
  updateValue: (value: number) => void;
}

export const ChallengeContext = createContext<ChallengeContextProvider>({
  challenge: {} as Challenge,
  newValue: 0,
  updateValue: (value: number) => { },
});

const onSave = async (challenge: Challenge, newCount: number, navigation: NativeStackNavigationProp<MainStackParamList, "ChallengeScreen", undefined>) => {
  challenge.currentValue = newCount;
  challenge.lastTimeUpdated = new Date().toISOString();
  challenge = updateChallengeStatus(challenge);

  const result = await challengesService.storeChallenge(challenge);

  if (result) {
    navigation.navigate('ChallengesScreen');
  }
}

const updateChallengeStatus = (challenge: Challenge) => {
  if (challenge.currentValue >= challenge.targetValue) {
    challenge.status = ProgressStatus.Completed;
  }
  else if (challenge.currentValue > 0) {
    challenge.status = ProgressStatus.InProgress;
  }
  else {
    challenge.status = ProgressStatus.NotStarted;
  }

  return challenge;
}

interface ChallengeContextProvider {
  challenge: Challenge;
  newValue: number;
  updateValue: (value: number) => void;
}

export const ChallengeScreen = ({ route, navigation }: ChallengeScreenProps) => {
  const challenge = route.params.challenge;

  const [newCount, setCount] = useState(challenge.currentValue);
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const updateValue = (value: number) => {
    setCount(value);
  }

  return (
    <View style={styles.container}>
      <ChallengeContext.Provider
        value={{
          challenge: challenge,
          newValue: newCount,
          updateValue: updateValue,
        }}>
        <View style={styles.animationContainer}>
          <LinearGradient
            start={{ x: 0.9, y: 0 }}
            colors={styles.linearGradient.colors}
            locations={[0, 0.6, 1]}
            style={styles.linearGradient}
          >
            <ChallengeHeader challenge={challenge} navigation={navigation} />
            <NumericProgressTile />
          </LinearGradient>
        </View>
        <View style={styles.dataContainer}>
          <Quantity />
        </View>
        <View style={styles.saveContainer}>
          <SaveButton
            title="Save"
            onPress={async () => onSave(challenge, newCount, navigation)}
          />
        </View>
      </ChallengeContext.Provider>
    </View >
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    animationContainer: {
      alignItems: 'center',
      width: '100%',
      flex: 6,
    },
    linearGradient: {
      flex: 1,
      width: '100%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary],
    },
    dataContainer: {
      alignItems: 'center',
      flex: 5
    },
    saveContainer: {
      flex: 1,
    },
    titleAndTrashCanWrapper: {
      flex: 1
    },
    numericProgressTile: {
      flex: 1
    },
    trashCan: {
      tintColor: theme.colors.white,
      position: 'absolute',
      top: 15,
      right: 15,
      height: 30,
      width: 30,
    }
  });

  return styles;
};

export default ChallengeScreen;
