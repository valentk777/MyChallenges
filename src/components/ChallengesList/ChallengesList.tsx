import React, { useContext, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { customTheme } from '../../styles/customTheme';
import { ThemeContext } from '../../contexts/themeContext';
import { Challenge, ProgressStatus } from '../../entities/challenge';
import { PressableTile } from '../Tile/PressableTile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStackParamList } from '../Menu/Menu';
import { ChallengeFilteringOptions } from '../../entities/challengeFilters';

type ChallengesScreenProps = NativeStackScreenProps<HomeStackParamList, 'Challenges'>;

interface ChallengesListProps {
  navigation: ChallengesScreenProps;
  filteringOptions: ChallengeFilteringOptions;
}

export const ChallengesList = (props: ChallengesListProps) => {
  const { navigation, filteringOptions } = props;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [challengesFromStorage, setDataSource] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  const getColor = (index: number) => {
    if (index % 3 === 0) {
      return theme.colors.tile1;
    }

    if (index % 3 === 1) {
      return theme.colors.tile2;
    }

    return theme.colors.tile3;
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      readData();
    });
  }, [navigation]);


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

  const filterData = (data) => {
    if (filteringOptions === ChallengeFilteringOptions.OnlyFavorite) {
      return data.filter((item) => item.favorite);
    }
    
    if (filteringOptions === ChallengeFilteringOptions.OnlyCompleted) {
      return data.filter((item) => item.status == ProgressStatus.Completed);
    }

    return data;
  }

  async function readData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const data = result.map((req) => JSON.parse(req[1]))

      if (data !== null) {
        setRefreshing(false);
        const filteredData = filterData(data);
        setDataSource(filteredData);
      }
    } catch (error) {
      alert(error)
    }
  }

  const onRefresh = () => {
    setDataSource([]);
    readData();
  };

  return (
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
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    menu: {
      flex: 1,
    },
    flatList: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: '5%',
      marginRight: '5%',
    },
  });

  return styles;
};
