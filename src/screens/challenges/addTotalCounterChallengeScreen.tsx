import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, useWindowDimensions } from 'react-native';
import { SaveButton } from '../../components/ButtonWrapper/SaveButton';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { TotalCounterChallenge } from '../../entities/challenge';
import challengesService from '../../services/challengesService';
import { useHeaderHeight } from '@react-navigation/elements';
import { icons } from '../../assets';
import { CircleButton } from '../../components/ButtonWrapper/CircleButton';
import ImageSwapper from '../../components/ImageSwapper/ImageSwapper';
import { SvgComponents } from '../../assets/svgIndex';
import { useTranslation } from 'react-i18next';

type AddTotalCounterChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'AddTotalCounterChallengeScreen'>;

export const AddTotalCounterChallengeScreen = ({ navigation, route }: AddTotalCounterChallengeScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { isDetailedCount, challengeType, originalChallenge } = route.params;

  const window = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const [title, onChangeTitleText] = useState(originalChallenge?.title != null ? originalChallenge.title : '');
  const [description, onChangeDescriptionText] = useState(originalChallenge?.description != null ? originalChallenge.description : '');
  const [targetValue, onChangeTargetValueText] = useState(originalChallenge?.targetValue != null ? originalChallenge.targetValue.toString() : '');
  const [imageLocation, setCurrentImageLocation] = useState(originalChallenge?.image != null ? originalChallenge.image : SvgComponents[0].location);
  
  const [initialValue, onChangeInitialValueText] = useState(originalChallenge?.initialValue != null ? originalChallenge.initialValue.toString() : '0');

  const { t } = useTranslation('add-total-counter-challenge-screen')
  
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

  const createOrUpdateChallenge = () => {

    const initialValueInt = stringToNumber(isDetailedCount, initialValue);
    const targetValueInt = stringToNumber(isDetailedCount, targetValue);

    const challengeCandidate = challengesService.createNewChallenge(title, description, initialValueInt, targetValueInt, imageLocation, challengeType) as TotalCounterChallenge;

    if (challengeCandidate == null) {
      return null;
    }

    if (originalChallenge != null) {
      challengeCandidate.id = originalChallenge.id;
      challengeCandidate.currentValue = originalChallenge.currentValue;
      challengeCandidate.timeCreated = originalChallenge.timeCreated;
      challengeCandidate.favorite = originalChallenge.favorite;
      challengeCandidate.status = originalChallenge.status;
    }

    challengeCandidate.isDetailedCount = isDetailedCount;

    return challengeCandidate;
  }

  const onSave = async () => {
    try {
      const challenge = createOrUpdateChallenge();

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
        <Text style={styles.text}>{t("title")}</Text>
        <TextInput
          style={styles.textbox}
          placeholder={t("title-placeholder")}
          onChangeText={onChangeTitleText}
          value={title}
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      {isDetailedCount &&
        <View style={styles.textImput}>
          <Text style={styles.text}>{t("initial-value")}</Text>
          <TextInput
            style={styles.textbox}
            placeholder={t("initial-value-placeholder")}
            onChangeText={onChangeInitialValueText}
            onBlur={() => setNumericValueOrDefault(initialValue, onChangeInitialValueText)}
            value={initialValue}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.secondary}
          />
        </View>}
      <View style={styles.textImput}>
        <Text style={styles.text}>{t("target-value")}</Text>
        <TextInput
          style={styles.textbox}
          placeholder={t("target-value-placeholder")}
          onChangeText={onChangeTargetValueText}
          onBlur={() => setNumericValueOrDefault(targetValue, onChangeTargetValueText)}
          value={targetValue}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.secondary}
        />
      </View>
      <View style={styles.textImput}>
        <Text style={styles.text}>{t("description")}</Text>
        <TextInput
          style={styles.textbox}
          placeholder={t("description-placeholder")}
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
        title={t("save")}
        onPress={async () => onSave()}
        isRoundBottom={true}
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

const createStyles = (theme: AppTheme) => {
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
