import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { SaveButton } from '../components/ButtonWrapper/ButtonWrapper';
import { ThemeContext } from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Challenge, ProgressStatus } from '../entities/challenge';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import { Dimensions } from 'react-native';
import { RootStackParamList } from '../../App';

type AddChallengeScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateNewChallenge'>;

export const AddChallengeScreen = ({ navigation }: AddChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');
  const [image, onChangeImageText] = useState(getRandomImage());

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={styles.inputBox}>
          <View style={styles.inputContaine}>
            {/* <Image style={styles.image} source={image} /> */}
            <Image style={styles.image} source={{ uri: image }}  />
            <View style={styles.space} />
            <Text style={styles.text}>Displayed title</Text>
            <TextInput
              style={styles.textbox}
              onChangeText={onChangeTitleText}
              value={title}
            />
            <View style={styles.space} />
            <Text style={styles.text}>Short description</Text>
            <TextInput
              style={styles.textbox}
              onChangeText={onChangeDescriptionText}
              value={description}
            />
            <View style={styles.space} />
            <Text style={styles.text}>Target numeric value</Text>
            <TextInput
              style={styles.textbox}
              onChangeText={onChangeTargetValueText}
              value={targetValue}
              keyboardType="numeric"
            />
            <View style={styles.space} />
            <View style={styles.space} />
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// TODO: move to shared component
const storeData = async (value: Challenge) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.id, jsonValue);
    return true;
  } catch (e) {
    alert("error saving to storage");
    return false;
  }
};

// TODO: move to shared component
const onSave = async (title, description, targetValue, image, navigation) => {
  if (title === "") {
    alert("Title cannot be empty");
    return false;
  }

  if (targetValue === undefined || targetValue === "" || targetValue === 0) {
    alert("Target value cannot be 0");
    return false;
  }

  const challengeCandidate = {} as Challenge;
  challengeCandidate.id = uuid.v4();
  challengeCandidate.title = title;
  challengeCandidate.description = description;
  challengeCandidate.currentValue = 0;
  challengeCandidate.targetValue = targetValue;
  challengeCandidate.image = image;
  // challengeCandidate.timeCreated = image;
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
    // require('../assets/img/freenaturestock-296-768x512.jpeg'),
    // require('../assets/img/freenaturestock-405-768x512.jpeg'),
    // require('../assets/img/freenaturestock-1794-768x512.jpg'),
    // require('../assets/img/freenaturestock-1948-768x512.jpg'),
    // require('../assets/img/freenaturestock-1969-768x512.jpg'),
    // require('../assets/img/freenaturestock-2147-768x512.jpg'),
    // require('../assets/img/freenaturestock-2137-768x512.jpg'),
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
      // height: 500,
      alignItems: 'center',
    },
    emptyWindow: {
      flex: 3,
      // height: '27%',
    },
    saveContainer: {
      flex: 1,
      // height: windowHeight - 500 - 60 - (windowHeight * 0.27),
    },
    inputContaine: {
      width: '90%',
      height: '100%',
      marginTop: 50,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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
      paddingLeft: 30,
      fontSize: 15,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.white,
      lineHeight: 17,
    },
    textbox: {
      flex: 1,
      marginLeft: 30,
      width: '85%',
      borderBottomColor: theme.colors.white,
      fontFamily: theme.text.fontFamily,
      fontSize: 15,
      color: theme.colors.white,
      borderBottomWidth: 1,
    },

  });
  return styles;
};
