import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState, useContext} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {Button, ButtonTypes} from '../components/ButtonWrapper/ButtonWrapper';
import {Quantity} from '../components/Quantity/Quantity';
import {Tile} from '../components/Tile/Tile';
import {ThemeContext} from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChallengeScreenProps = NativeStackScreenProps<RootStackParamList, 'Challenge'>;

// TODO: move to shared component
const storeData = async (value: Challenge) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.id, jsonValue);
    return true;
  } catch (e) {
    alert("error saving to storage");
    alert(e);
    return false;
  }
};

const onSave = async (challenge: Challenge, newValue: int, props) => {
  challenge.currentValue = newValue;

  const result = await storeData(challenge);

  if (result) {
    props.navigation.push('Challenges');
  }
}

export const ChallengeScreen = (props: ChallengeScreenProps) => {
  const [newCount, setCount] = useState(props.route.params.challenge.currentValue);
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.tileContainer}>
        <Tile challenge={props.route.params.challenge} />
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.text}>Quantity</Text>
        <Quantity count={newCount} setCount={setCount} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type={ButtonTypes.Primary}
          title="Save"
          onPress={async () => onSave(props.route.params.challenge, newCount, props)}
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
    },
    tileContainer: {
      alignItems: 'center',
      height: '55%',
    },
    quantityContainer: {
      height: '20%',
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
