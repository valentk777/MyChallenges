import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState, useEffect } from 'react';
import {
  FlatList, SafeAreaView, StyleSheet, View, RefreshControl, ActivityIndicator
} from 'react-native';
import { PressableTile } from '../components/Tile/PressableTile';
import { Challenge } from '../entities/challenge';
import { ThemeContext } from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customTheme } from '../styles/customTheme';
import LinearGradient from 'react-native-linear-gradient'
import Menu, { HomeStackParamList } from '../components/Menu/Menu';

type ChallengesScreenProps = NativeStackScreenProps<HomeStackParamList, 'Challenges'>;

const ChallengesScreen = ({ navigation }: ChallengesScreenProps) => {
  const [challengesFromStorage, setDataSource] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    navigation.addListener('focus', () => {
      readData();
    });
  }, [navigation]);

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
    if (index % 3 === 0) {
      return theme.colors.tile1;
    }

    if (index % 3 === 1) {
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
        onPress={() => navigation.navigate('Challenge', { challenge: item })} />
    );
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        locations={[0, 0.6, 1]}
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <SafeAreaView style={styles.container}>
          {refreshing ? <ActivityIndicator /> : null}
          <View style={styles.flatList}>
            <FlatList
              data={challengesFromStorage}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={item => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 100, justifyContent: 'center', paddingBottom: 150 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>

        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearGradient: {
      flex: 15,
      // width: '100%',
      // alignItems: 'center',
      // justifyContent: 'center',
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary]
    },
    menu: {
      flex: 1,
      // width: '100%',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    flatList: {
      // flex: 1,
      // height: '100%',
      // alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: '5%',
      marginRight: '5%',
      // justifyContent: 'center',
    },
    // columns: {
    //   justifyContent: 'space-around',
    //   marginBottom: 20,
    //   marginTop: 20,
    // },
  });

  return styles;
};

export default ChallengesScreen;