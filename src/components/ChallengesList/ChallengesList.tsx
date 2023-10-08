import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { customTheme } from '../../styles/customTheme';
import { Challenge } from '../../entities/challenge';
import { PressableTile } from '../Tile/PressableTile';
import { HomeStackParamList } from '../../navigators/MenuTabNavigator';
import { ChallengeFilteringOptions } from '../../entities/challengeFilters';
import { ProgressStatus } from '../../entities/progressStatus';
import challengesService from '../../services/challengesService';
import { ChallengeTypes } from '../../entities/challengeTypes';
import { useTheme } from '../../hooks/useTheme';

type ChallengesScreenProps = NativeStackScreenProps<HomeStackParamList, 'ChallengesScreen'>;

interface ChallengesListProps {
  navigation: ChallengesScreenProps;
  filteringOptions: ChallengeFilteringOptions;
}

export const ChallengesList = (props: ChallengesListProps) => {
  const { navigation, filteringOptions } = props;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [challengesFromStorage, setDataSource] = useState([] as Challenge[]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      readData();
    });
  }, [navigation]);

  const OnPressNavigate = (item: Challenge) => {
    if (item.type === ChallengeTypes.TotalSimpleCounter || item.type === ChallengeTypes.TotalDetailedCounter) {
      navigation.navigate('TotalCounterChallengeScreen', { challenge: item })
    }
    else if (item.type === ChallengeTypes.DailyBolleanCalendar) {
      navigation.navigate('DailyCalendarChallengeScreen', { challenge: item })
    }
    else {
      console.log(item.type);
    }
  }

  const renderItem = (item: Challenge, index: number) => {
    return (
      <PressableTile
        title={item.title}
        challenge={item}
        onPress={() => OnPressNavigate(item)} />
    );
  };

  const filterData = (data: Challenge[]) => {
    if (filteringOptions === ChallengeFilteringOptions.OnlyFavorite) {
      return data.filter((item) => item.favorite);
    }

    if (filteringOptions === ChallengeFilteringOptions.OnlyCompleted) {
      return data.filter((item) => item.status == ProgressStatus.Completed);
    }

    return data;
  }

  function toSorted(data: Challenge[]) {
    const sortedData = data.slice();
    sortedData.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      }

      // descending order
      return b.timeCreated.localeCompare(a.timeCreated);
    });
    return sortedData;
  }

  async function readData() {
    try {
      const challenges = await challengesService.getAllChalenges();

      if (challenges.length == 0) {
        setRefreshing(false);
        setDataSource([]);
        return;
      }

      let filteredData = filterData(challenges);
      filteredData = toSorted(filteredData);
      setDataSource(filteredData);
      setRefreshing(false);
    } catch (error) {
      Alert.alert(`${error}`)
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
