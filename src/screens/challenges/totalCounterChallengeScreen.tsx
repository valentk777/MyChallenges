import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { Quantity } from '../../components/Quantity/Quantity';
import { NumericProgressTile } from '../../components/Tile/NumericProgressTile';
import { ThemeContext } from '../../contexts/themeContext';
import { TotalCounterChallenge } from '../../entities/challenge';
import { customTheme } from '../../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { ProgressStatus } from '../../entities/progressStatus';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import challengesService from '../../services/challengesService';
import { ChallengeHeader } from '../../components/Menu/ChallengeHeader';
import { ChallengeContext } from '../../hooks/useChallenge';
import { ChallengeTypes } from '../../entities/challengeTypes';

type TotalCounterChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'TotalCounterChallengeScreen'>;

export const TotalCounterChallengeScreen = ({ route, navigation }: TotalCounterChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const challenge = route.params.challenge;

  const [newCount, setCount] = useState(challenge.currentValue);

  const updateValue = (value: number) => {
    setCount(value);
  }

  const updateChallengeStatus = (challenge: TotalCounterChallenge) => {
    const percentage = challengesService.getPercentage(challenge.currentValue, challenge.initialValue, challenge.targetValue);

    if (percentage >= 100) {
      challenge.status = ProgressStatus.Completed;
    }
    else if (percentage > 0) {
      challenge.status = ProgressStatus.InProgress;
    }
    else {
      challenge.status = ProgressStatus.NotStarted;
    }

    return challenge;
  }

  const onSave = async (challenge: TotalCounterChallenge, newCount: number, navigation: NativeStackNavigationProp<MainStackParamList, "TotalCounterChallengeScreen", undefined>) => {
    challenge.currentValue = newCount;
    challenge.lastTimeUpdated = new Date().toISOString();
    challenge = updateChallengeStatus(challenge);

    const result = await challengesService.storeChallenge(challenge);

    if (result) {
      navigation.goBack();
    }
  }

  const onEdit = () => {
    navigation.navigate('AddTotalCounterChallengeScreen', { 
      challengeType: challenge.isDetailedCount ? ChallengeTypes.TotalDetailedCounter : ChallengeTypes.TotalSimpleCounter, 
      isDetailedCount: challenge.isDetailedCount, 
      originalChallenge: challenge 
    });
  }

  const renderProgressContainer = () => (
    <View style={styles.animationContainer}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.6, 1]}
        style={styles.linearGradient}
      >
        <ChallengeHeader challenge={challenge} navigation={navigation} onEdit={onEdit} />
        <NumericProgressTile />
      </LinearGradient>
    </View>
  );

  const renderQuantityContainer = () => (
    <View style={styles.dataContainer}>
      <Quantity />
    </View>
  );

  const renderSaveContainer = () => (
    <View style={styles.saveContainer}>
      <SaveButton
        title="Save"
        onPress={async () => onSave(challenge, newCount, navigation)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ChallengeContext.Provider
        value={{
          challenge: challenge,
          newValue: newCount,
          updateValue: updateValue,
        }}>
        {renderProgressContainer()}
        {renderQuantityContainer()}
        {renderSaveContainer()}
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

export default TotalCounterChallengeScreen;
