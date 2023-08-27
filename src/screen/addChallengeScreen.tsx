import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Alert } from 'react-native';
import { SaveButton } from '../components/ButtonWrapper/ButtonWrapper';
import { ThemeContext } from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Challenge, ProgressStatus } from '../entities/challenge';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { RootStackParamList } from '../../App';

type AddChallengeScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateNewChallenge'>;

export const AddChallengeScreen = ({ navigation }: AddChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');
  const [image] = useState(getRandomImage());

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.inputBox}>
          <View style={[styles.inputContaine, styles.shadow]}>
            <Image style={styles.image} source={{ uri: image }} />
            <Text style={styles.text}>Displayed title</Text>
            <TextInput
              style={styles.textbox}
              onChangeText={onChangeTitleText}
              value={title}
            />
            <Text style={styles.text}>Short description</Text>
            <TextInput
              style={styles.textbox}
              onChangeText={onChangeDescriptionText}
              value={description}
            />
            <Text style={styles.text}>Target numeric value</Text>
            <TextInput
              style={styles.textbox}
              onChangeText={onChangeTargetValueText}
              value={targetValue}
              keyboardType="numeric"
            />
            <View style={styles.space} />
          </View>
        </View>
        <View style={styles.emptyWindow}></View>
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

const windowHeight = Dimensions.get('window').height;

// TODO: move to shared component
const storeData = async (value: Challenge) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.id, jsonValue);
    return true;
  } catch (e) {
    Alert.alert("error saving to storage");
    return false;
  }
};

// TODO: move to shared component
const onSave = async (title, description, targetValue, image, navigation) => {
  if (title === "") {
    Alert.alert("Title cannot be empty");
    return false;
  }

  if (targetValue === undefined || targetValue === "" || targetValue === 0) {
    Alert.alert("Target value cannot be 0");
    return false;
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

  const result = await storeData(challengeCandidate);

  if (result) {
    navigation.navigate('Challenges');
  }
}

function getRandomImage() {
  const images = [
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-2137-768x512.jpg',
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-1948-768x512.jpg',
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-1969-768x512.jpg',
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-1794-768x512.jpg',
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-296-768x512.jpeg',
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-405-768x512.jpeg',
    'https://freenaturestock.com/wp-content/uploads/freenaturestock-2147-768x512.jpg',
  ]

  const imageId = Math.floor(Math.random() * 100) % 7;

  return images[imageId];
}

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: windowHeight - 50, //header
      backgroundColor: theme.colors.primary,
    },
    linearGradient: {
      height: '100%',
      colors: [theme.colors.primary, theme.colors.secondary],
    },
    inputBox: {
      flex: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyWindow: {
      flex: 3,
    },
    saveContainer: {
      flex: 1,
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
      flex: 7,
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    space: {
      flex: 2,
    },
    text: {
      flex: 1,
      marginLeft: 30,
      marginRight: 30,
      fontWeight: 'bold',
      fontFamily: theme.text.fontFamily,
      color: theme.colors.black,
      marginTop: 5,
    },
    textbox: {
      flex: 1,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 5,
      fontFamily: theme.text.fontFamily,
      color: theme.colors.black,
      borderBottomColor: theme.colors.black,
      borderBottomWidth: 1,
    },

  });
  return styles;
};
