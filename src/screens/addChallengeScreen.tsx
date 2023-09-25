import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Alert } from 'react-native';
import { SaveButton } from '../components/ButtonWrapper/SaveButton';
import { ThemeContext } from '../contexts/themeContext';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { MainStackParamList } from '../navigators/MainStackNavigator';
import { Challenge } from '../entities/challenge';
import { ProgressStatus } from '../entities/progressStatus';
import uuid from 'react-native-uuid';
import { useHeaderHeight } from '@react-navigation/elements';
import challengesService from '../services/challengesService';

type AddChallengeScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateNewChallengeScreen'>;

const windowHeight = Dimensions.get('window').height;

export const getRandomImage = () => {
  const localImages = [
    // images['freenaturestock-296-768x512.jpeg'],
    // images['freenaturestock-405-768x512.jpeg'],
    // images['freenaturestock-1794-768x512.jpg'],
    // images['freenaturestock-1948-768x512.jpg'],
    // images['freenaturestock-1969-768x512.jpg'],
    // images['freenaturestock-2137-768x512.jpg'],
    // images['freenaturestock-2147-768x512.jpg'],
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-2137-768x512.jpg',
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-1948-768x512.jpg',
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-1969-768x512.jpg',
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-1794-768x512.jpg',
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-296-768x512.jpeg',
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-405-768x512.jpeg',
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-2147-768x512.jpg',
  ]

  const imageId = Math.floor(Math.random() * 100) % 7;

  return localImages[imageId];
}

const createNewChallenge = (title: string, description: string, targetValue: number, image: string) => {
  if (title === "") {
      Alert.alert("Title cannot be empty");
      throw new Error("Title cannot be empty");
  }

  if (isNaN(targetValue)) {
      Alert.alert("Target value numbe be a number");
      throw new Error("Target value numbe be a number");
  }

  if (targetValue <= 0) {
      Alert.alert("Target value cannot be 0");
      throw new Error("Target value cannot be 0");
  }

  const currentUtcTime = new Date().toISOString();
  const challengeCandidate = {} as Challenge;

  challengeCandidate.id = uuid.v4().toString();
  challengeCandidate.title = title;
  challengeCandidate.description = description;
  challengeCandidate.currentValue = 0;
  challengeCandidate.targetValue = targetValue;
  challengeCandidate.image = image;
  challengeCandidate.timeCreated = currentUtcTime;
  challengeCandidate.lastTimeUpdated = currentUtcTime;
  challengeCandidate.favorite = false;
  challengeCandidate.status = ProgressStatus.NotStarted;

  return challengeCandidate;
}

export const AddChallengeScreen = ({ navigation }: AddChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const headerHeight = useHeaderHeight();

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');
  const [image] = useState(getRandomImage());

  const screenHeight = windowHeight - headerHeight;

  return (
    <View style={{ ...styles.container, height: screenHeight }}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.mainScreen}>
          <View style={styles.inputBox}>
            <View style={[styles.inputContaine, styles.shadow]}>
              <Image style={styles.image} source={{ uri: image }} />
              <View style={styles.textArea}>
                <View style={styles.textImput}>
                  <Text style={styles.text}>Displayed title</Text>
                  <TextInput
                    style={styles.textbox}
                    onChangeText={onChangeTitleText}
                    value={title}
                  />
                </View>
                <View style={styles.textImput}>
                  <Text style={styles.text}>Short description</Text>
                  <TextInput
                    style={styles.textbox}
                    onChangeText={onChangeDescriptionText}
                    value={description}
                  />
                </View>
                <View style={styles.textImput}>
                  <Text style={styles.text}>Target numeric value</Text>
                  <TextInput
                    style={styles.textbox}
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
            onPress={async () => onSave(title, description, targetValue, image, navigation)}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const onSave = async (title: string, description: string, targetValue: string, image: string, navigation) => {
  try {
    const targetValueInt = parseInt(targetValue, 10);
    const challenge = createNewChallenge(title, description, targetValueInt, image);
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
    shadow: {
      shadowColor: theme.colors.input,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 10,
      }
    },
    image: {
      flex: 1,
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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
      fontWeight: 'bold',
      color: theme.colors.black,
      fontFamily: theme.text.fontFamily,
    },
    textbox: {
      flex: 2,
      padding: 0,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.black,
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
    },
  });

  return styles;
};

export default AddChallengeScreen;
