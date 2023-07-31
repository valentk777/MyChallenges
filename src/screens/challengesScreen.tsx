import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState, useEffect} from 'react';
import {
    FlatList, SafeAreaView, StyleSheet, View, RefreshControl, ActivityIndicator, StatusBar
} from 'react-native';
import {HomeStackParamList} from '../../App';
import {PressableTile} from '../components/Tile/PressableTile';
import {globalChallengesDB} from '../database/challengesDB';
import {Challenge} from '../entities/challenge';
import {ThemeContext} from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customTheme } from '../styles/customTheme';

type ChallengesScreenProps = NativeStackScreenProps<HomeStackParamList, 'Challenges'>;

export const ChallengesScreen = ({navigation}: ChallengesScreenProps) => {
  const [challengesFromStorage, setDataSource] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    readData();
  }, []);

    async function readData() {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const data = result.map((req) => JSON.parse(req[1]))

        if (data !== null) {
          setRefreshing(false);
          setDataSource(data);
        }
      } catch (error) {
        alert(error)
      }
    }

    const onRefresh = () => {
      setDataSource([]);
      readData();
    };

    const getColor = (index: number) => {
      if(index % 3 === 0) {
        return theme.colors.tile1;
      }

      if(index % 3 === 1) {
        return theme.colors.tile2;
      }

      return theme.colors.tile3;
    }
    
  const renderItem = (item: Challenge, index: number) => {
    const color = getColor(index);

    return (
      <PressableTile
        title={item.title}
        challenge={item}
        color={color}
        onPress={() => navigation.navigate('Challenge', { challenge: item })}/>
    );
  };

  return (
    <SafeAreaView style={styles.global}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={challengesFromStorage}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={item => item.id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{flexGrow: 10, justifyContent: 'center'}}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    global: {
      backgroundColor: theme.colors.background,
      height: '100%',
    },
    flatList: {

    },
    columns: {
      justifyContent: 'space-around',
      marginBottom: 20,
      marginTop: 20,
    },
  });

  return styles;
};

