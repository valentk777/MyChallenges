import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, useWindowDimensions } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { useTheme } from '../../hooks/useTheme';
import { customTheme } from '../../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { TotalCounterChallenge } from '../../entities/challenge';
import { ProgressStatus } from '../../entities/progressStatus';
import uuid from 'react-native-uuid';
import challengesService from '../../services/challengesService';
import { useHeaderHeight } from '@react-navigation/elements';
import { icons } from '../../assets';
import { CircleButton } from '../../components/ButtonWrapper/CircleButton';
import ImageSwapper from '../../components/ImageSwapper/ImageSwapper';
import { SvgComponents } from '../../assets/svgIndex';

type AddTotalCounterChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'AddTotalCounterChallengeScreen'>;

export const AddTotalCounterChallengeScreen = ({ navigation, route }: AddTotalCounterChallengeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { isDetailedCount, challengeType, originalChallenge } = route.params;

  const window = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const [title, onChangeTitleText] = useState(originalChallenge?.title != null ? originalChallenge.title : '');
  const [description, onChangeDescriptionText] = useState(originalChallenge?.description != null ? originalChallenge.description : '');
  const [initialValue, onChangeInitialValueText] = useState(originalChallenge?.initialValue != null ? originalChallenge.initialValue.toString() : '0');
  const [targetValue, onChangeTargetValueText] = useState(originalChallenge?.targetValue != null ? originalChallenge.targetValue.toString() : '');
  const [imageLocation, setCurrentImageLocation] = useState(originalChallenge?.image != null ? originalChallenge.image : SvgComponents[0].location);

  const handleImageChange = newIndex => {
    setCurrentImageLocation(newIndex);
  };

  const stringToNumber = (isDetailedCount: boolean, value: string) => {
    let valueInt = 0;

    if (isDetailedCount) {
      valueInt = parseFloat(value);
    } else {
      valueInt = parseInt(value, 10);
    }

    return valueInt
  }

  const createNewChallenge = () => {
    if (title === "") {
      Alert.alert("Title cannot be empty");
      return null;
    }

    if (title.length > 20) {
      Alert.alert("Title too long. Max 20 symbols allowed");
      return null;
    }

    if (description.length > 90) {
      Alert.alert("Description too long. Max 90 symbols allowed");
      return null;
    }

    const initialValueInt = stringToNumber(isDetailedCount, initialValue);

    if (isNaN(initialValueInt)) {
      Alert.alert("Initial value should be a number");
      return null;
    }

    if (initialValueInt < 0) {
      Alert.alert("Initial value should be positive");
      return null;
    }

    const targetValueInt = stringToNumber(isDetailedCount, targetValue);

    if (isNaN(targetValueInt)) {
      Alert.alert("Target value should be a number");
      return null;
    }

    if (targetValueInt <= 0) {
      Alert.alert("Target value should be positive");
      return null;
    }

    const currentUtcTime = new Date().toISOString();
    const challengeCandidate = {} as TotalCounterChallenge;

    challengeCandidate.id = originalChallenge?.id != null ? originalChallenge.id : uuid.v4().toString();
    challengeCandidate.title = title;
    challengeCandidate.description = description;
    challengeCandidate.initialValue = initialValueInt;
    challengeCandidate.currentValue = originalChallenge?.currentValue != null ? originalChallenge.currentValue : 0;
    challengeCandidate.targetValue = targetValueInt;
    challengeCandidate.image = imageLocation;
    challengeCandidate.timeCreated = originalChallenge?.timeCreated != null ? originalChallenge.timeCreated : currentUtcTime;
    challengeCandidate.timeCreated = currentUtcTime;
    challengeCandidate.lastTimeUpdated = currentUtcTime;
    challengeCandidate.favorite = originalChallenge?.favorite != null ? originalChallenge.favorite : false;
    challengeCandidate.status = originalChallenge?.status != null ? originalChallenge.status : ProgressStatus.NotStarted;
    challengeCandidate.type = challengeType;
    challengeCandidate.isDetailedCount = isDetailedCount;

    return challengeCandidate;
  }

  const onSave = async () => {
    try {
      const challenge = createNewChallenge();

      if (challenge === null) {
        return false;
      }

      const result = await challengesService.storeChallenge(challenge);

      if (result) {
        navigation.navigate('ChallengesScreen');
      }
    }
    catch (exception) {
      return false;
    }
  }

  const renderHeaderContainer = () => (
    <View style={styles.imageArea}>
      <View style={styles.imageSwapper}>
        <ImageSwapper initialImageLocation={imageLocation} onImageChange={handleImageChange} />
      </View>
      <CircleButton
        imgUrl={icons["back-arrow.png"]}
        onPress={() => navigation.navigate('ChallengesScreen')}
        style={styles.backCircle}
      />
    </View>
  );

  const setNumericValueOrDefault = (value: string, setValueFunction) => {
    const defaultNumbericValue = '0';

    const numericValue = stringToNumber(isDetailedCount, value);

    if (!isNaN(numericValue)) {
      setValueFunction(numericValue.toString());
    } else {
      setValueFunction(defaultNumbericValue);
    }
  }

  const renderInputContainer = () => (
    <View style={styles.textArea}>
      <View style={styles.textImput}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Enter your challenge title...'
          onChangeText={onChangeTitleText}
          value={title}
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      {isDetailedCount &&
        <View style={styles.textImput}>
          <Text style={styles.text}>Initial value</Text>
          <TextInput
            style={styles.textbox}
            placeholder='Enter initial numeric value...'
            onChangeText={onChangeInitialValueText}
            onBlur={() => setNumericValueOrDefault(initialValue, onChangeInitialValueText)}
            value={initialValue}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.secondary}
          />
        </View>}
      <View style={styles.textImput}>
        <Text style={styles.text}>Target value</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Enter target numeric value...'
          onChangeText={onChangeTargetValueText}
          onBlur={() => setNumericValueOrDefault(targetValue, onChangeTargetValueText)}
          value={targetValue}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>Short description</Text>
        <TextInput
          style={styles.textbox}
          placeholder='Enter a short description...'
          onChangeText={onChangeDescriptionText}
          value={description}
          placeholderTextColor={theme.colors.secondary}
        />
      </View>

      <View style={styles.textImput} />
    </View>
  );

  const renderSaveContainer = () => (
    <View style={styles.saveContainer}>
      <SaveButton
        title="Save"
        onPress={async () => onSave()}
      />
    </View>
  );

  return (
    <View style={{ ...styles.container, height: window.height - headerHeight }}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.mainScreen}>
          <View style={styles.inputBox}>
            <View style={[styles.inputContaine]}>
              {renderHeaderContainer()}
              {renderInputContainer()}
            </View>
          </View>
          <View style={styles.empty} />
        </View>
        {renderSaveContainer()}
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    linearGradient: {
      flex: 1,
      height: '100%',
      colors: [theme.colors.primary, theme.colors.secondary],
    },
    iconsStyle: {
      height: 100,
      width: 100,
    },
    mainScreen: {
      flex: 11,
    },
    saveContainer: {
      flex: 1,
    },
    inputBox: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    empty: {
      flex: 2,
    },
    inputContaine: {
      width: '90%',
      height: '80%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: theme.colors.canvas
    },
    imageArea: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    imageSwapper: {
      flex: 1,
      width: '60%',
    },
    backCircle: {
      left: 15,
      top: 15,
    },
    textArea: {
      flex: 3,
      justifyContent: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    textImput: {
      flex: 1,
    },
    text: {
      flex: 3,
      textAlignVertical: 'bottom',
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.primary,
    },
    textbox: {
      flex: 2,
      padding: 0,
      fontFamily: theme.fonts.light,
      color: theme.colors.secondary,
      borderBottomColor: theme.colors.canvasInverted,
      borderBottomWidth: 1,
    },
  });

  return styles;
};

export default AddTotalCounterChallengeScreen;
