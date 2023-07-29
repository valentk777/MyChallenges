import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState, useEffect} from 'react';
import {
    FlatList, SafeAreaView, StyleSheet, View, RefreshControl, ActivityIndicator
} from 'react-native';
import {RootStackParamList} from '../../App';
import {PressableTile} from '../components/Tile/PressableTile';
import {globalChallengesDB} from '../database/challengesDB';
import {Challenge} from '../entities/challenge';
import {ThemeContext} from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChallengesScreenProps = NativeStackScreenProps<RootStackParamList, 'Challenges'>;

export const ChallengesScreen = (props: ChallengesScreenProps) => {
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
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={challengesFromStorage}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={styles.columns}
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


