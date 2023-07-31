import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { HomeStackParamList } from '../../App';
import { Button, ButtonTypes, SaveButton } from '../components/ButtonWrapper/ButtonWrapper';
import { ThemeContext } from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Challenge } from '../entities/challenge';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'

type AddChallengeScreenProps = NativeStackScreenProps<HomeStackParamList, 'AddChallenge'>;

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
const onSave = async (title, description, targetValue, props) => {
  if (title === "") {
    alert("Title cannot be empty");
    return false;
  }

  if (targetValue === 0) {
    alert("Target value cannot be 0");
    return false;
  }

  const challengeCandidate = {} as Challenge;
  challengeCandidate.id = uuid.v4();
  challengeCandidate.title = title;
  challengeCandidate.id = title;
  challengeCandidate.description = description;
  challengeCandidate.currentValue = 0;
  challengeCandidate.targetValue = targetValue;
  challengeCandidate.image = getRandomImage();

  const result = await storeData(challengeCandidate);

  if (result) {
    props.navigation.navigate('Challenges');
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

export const AddChallengeScreen = (props: AddChallengeScreenProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');

  const image = getRandomImage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
          <View style={styles.inputBox}>
          <View style={styles.inputContaine}>
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
          </View>
        </View>
        <View style={styles.saveContainer}>
          <SaveButton
            title="Save"
            onPress={async () => onSave(title, description, targetValue, props)}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: theme.colors.primary,
    },
    linearGradient: {
      height: '100%',
      colors: [theme.colors.primary, theme.colors.secondary],
    },
    inputBox: {
      height: '92%',
      alignItems: 'center',
    },
    inputContaine: {
      width: '90%',
      height: '85%',
      // alignItems: 'center',
      // marginTop: 10,
      // marginBottom: 10,

      marginTop: 50,
      // marginBottom: 100,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    image: {
      width: '100%',
      height: '30%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // marginTop: 10,
      // marginLeft: 30,
      // fontSize: 15,
      // fontFamily: theme.text.fontFamily,
      // fontWeight: 'bold',
      // color: theme.colors.black,
    },
    text: {
      paddingLeft: 30,
      paddingTop: 25,
      paddingBottom: 5,
      // marginTop: 10,
      // marginLeft: 30,
      fontSize: 15,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    textbox: {
      marginLeft: 30,
      // marginBottom: 15,
      // marginLeft: 20,
      // marginRight: 20,
      // fontSize: 20,
      width: '85%',
      backgroundColor: theme.colors.input,
      borderRadius: 5,
      fontFamily: theme.text.fontFamily,
      fontSize: 13,
      color: theme.colors.white,
      // borderRadius: 10,
    },
    saveContainer: {
      // marginRight: 20,
      // marginLeft: 20,
      height: '8%',
    },
  });
  return styles;
};
