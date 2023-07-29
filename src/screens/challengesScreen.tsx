import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {PressableTile} from '../components/Tile/PressableTile';
import {globalChallengesDB} from '../database/challengesDB';
import {Challenge} from '../entities/challenge';
import {ThemeContext} from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChallengesScreenProps = NativeStackScreenProps<RootStackParamList, 'Challenges'>;

export const ChallengesScreen = (props: ChallengesScreenProps) => {

  async function readData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const data = result.map((req) => JSON.parse(req[1]))
      if (data !== null) {
        setInput(data);
      }
    } catch (error) {
      alert(error)
    }
  }

  const [challengesFromStorage, setInput] = useState('');
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  React.useEffect(() => {
    readData();
  }, []);

  const renderItem = ({item}: {item: Challenge}) => {
    return (
      <PressableTile
        title={item.title}
        challenge={item}
        onPress={() => props.navigation.push('Challenge', {challenge: item})}
      />
    );
  };

  return (
    <SafeAreaView style={styles.global}>
      <FlatList
        data={challengesFromStorage}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={styles.columns}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    global: {
      backgroundColor: theme.colors.background,
      height: '100%'
    },
    columns: {
      justifyContent: 'space-around',
      marginBottom: 20,
      marginTop: 20,
    },
  });

  return styles;
};


