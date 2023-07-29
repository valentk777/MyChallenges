import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState, useContext} from 'react';
import {Alert, StyleSheet, Text, View, TextInput} from 'react-native';
import {RootStackParamList} from '../../App';
import {Button, ButtonTypes} from '../components/ButtonWrapper/ButtonWrapper';
import {Quantity} from '../components/Quantity/Quantity';
import {Tile} from '../components/Tile/Tile';
import {ThemeContext} from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

type AddChallengeScreenProps = NativeStackScreenProps<RootStackParamList, 'AddChallenge'>;

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
const onSave = (title, description, targetValue, props) => {
  if (title === "") {
    alert("Title cannot be empty");
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

  const result = storeData(challengeCandidate);

  if (result) {
    props.navigation.push('Challenges');
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
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [title, onChangeTitleText] = useState('');
  const [description, onChangeDescriptionText] = useState('');
  const [targetValue, onChangeTargetValueText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Challenge title</Text>
      <TextInput
        style={styles.text}
        onChangeText={onChangeTitleText}
        value={title}
      />
      <Text style={styles.text}>Challenge description</Text>
      <TextInput
        style={styles.text}
        onChangeText={onChangeDescriptionText}
        value={description}
      />
    <Text style={styles.text}>Challenge target value</Text>
    <TextInput
        style={styles.text}
        onChangeText={onChangeTargetValueText}
        value={targetValue}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button
          type={ButtonTypes.Primary}
          title="Save"
          onPress={() => onSave(title, description, targetValue, props)}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      marginBottom: 15,
      height: '100%',
      backgroundColor: theme.colors.primary,
    },
    text: {
      marginLeft: 30,
      fontSize: 20,
    },
    buttonContainer: {
      height: '25%',
      marginRight: 20,
      marginLeft: 20,
    },
  });
  return styles;
};




