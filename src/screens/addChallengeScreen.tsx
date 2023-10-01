import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, useWindowDimensions } from 'react-native';
import { SaveButton } from '../components/ButtonWrapper/SaveButton';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { Challenge } from '../entities/challenge';
import { ProgressStatus } from '../entities/progressStatus';
import uuid from 'react-native-uuid';
import challengesService from '../services/challengesService';
import { useHeaderHeight } from '@react-navigation/elements';
import { icons } from '../assets';
import { CircleButton } from '../components/ButtonWrapper/CircleButton';
import ImageSwapper from '../components/ImageSwapper/ImageSwapper';
import { SvgComponents } from '../assets/svgIndex';

type AddChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateNewChallengeScreen'>;

const createNewChallenge = (title: string, description: string, targetValue: number, imageLocation: string) => {
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

  if (targetValue === null || isNaN(targetValue)) {
    Alert.alert("Target value should be a number");
    return null;
  }

  if (targetValue <= 0) {
    Alert.alert("Target value cannot be 0");
    return null;
  }

  const currentUtcTime = new Date().toISOString();
  const challengeCandidate = {} as Challenge;

  challengeCandidate.id = uuid.v4().toString();
  challengeCandidate.title = title;
  challengeCandidate.description = description;
  challengeCandidate.currentValue = 0;
  challengeCandidate.targetValue = targetValue;
  challengeCandidate.image = imageLocation;
  challengeCandidate.timeCreated = currentUtcTime;
  challengeCandidate.lastTimeUpdated = currentUtcTime;
  challengeCandidate.favorite = false;
  challengeCandidate.status = ProgressStatus.NotStarted;

  return challengeCandidate;
}

export const AddChallengeScreen = ({ navigation }: AddChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const window = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');
  const [imageLocation, setCurrentImageLocation] = useState(SvgComponents[50 % SvgComponents.length].location);

  const handleImageChange = newIndex => {
    setCurrentImageLocation(newIndex);
  };

  return (
    <View style={{ ...styles.container, height: window.height - headerHeight }}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.mainScreen}>
          <View style={styles.inputBox}>
            <View style={[styles.inputContaine, theme.shadows.primary]}>
              <View style={styles.imageArea}>
                <View style={styles.imageSwapper}>
                  <ImageSwapper onImageChange={handleImageChange} />
                </View>
                <CircleButton
                    imgUrl={icons["back-arrow.png"]}
                    onPress={() => navigation.goBack()}
                    style={[styles.backCircle, theme.shadows.dark]}
                  />
              </View>
              <View style={styles.textArea}>
                <View style={styles.textImput}>
                  <Text style={styles.text}>Displayed title</Text>
                  <TextInput
                    style={styles.textbox}
                    placeholder='Enter your challenge title...'
                    onChangeText={onChangeTitleText}
                    value={title}
                  />
                </View>
                <View style={styles.textImput}>
                  <Text style={styles.text}>Short description</Text>
                  <TextInput
                    style={styles.textbox}
                    placeholder='Enter a short description...'
                    onChangeText={onChangeDescriptionText}
                    value={description}
                  />
                </View>
                <View style={styles.textImput}>
                  <Text style={styles.text}>Target numeric value</Text>
                  <TextInput
                    style={styles.textbox}
                    placeholder='Enter target value...'
                    onChangeText={onChangeTargetValueText}
                    value={targetValue}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.textImput} />
              </View>
            </View>
          </View>
          <View style={styles.empty} />
        </View>
        <View style={styles.saveContainer}>
          <SaveButton
            title="Save"
            onPress={async () => onSave(title, description, targetValue, imageLocation, navigation)}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const onSave = async (title: string, description: string, targetValue: string, imageLocation: string, navigation) => {
  try {
    const targetValueInt = parseInt(targetValue, 10);
    const challenge = createNewChallenge(title, description, targetValueInt, imageLocation);

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
      backgroundColor: theme.colors.white
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
      width: '60%'
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
      color: theme.colors.black,
    },
    textbox: {
      flex: 2,
      padding: 0,
      fontFamily: theme.fonts.light,
      color: theme.colors.black,
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
    },
  });

  return styles;
};

export default AddChallengeScreen;
