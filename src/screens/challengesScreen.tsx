import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {PressableTile} from '../components/Tile/PressableTile';
import {globalChallengesDB} from '../database/challengesDB';
import {Challenge} from '../entities/challenge';
import {ThemeContext} from '../contexts/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChallengesScreenProps = NativeStackScreenProps<RootStackParamList, 'Challenges'>;

// const importData = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     const result = await AsyncStorage.multiGet(keys);
//
// //     alert([ JSON.parse(jsonValue)])
// //     return [ JSON.parse(jsonValue)]
//
//     // cccc, xsxs
//     return result.map((req) => JSON.parse(req[1]));
//   } catch (error) {
//     alert(error)
//   }
// }

export const ChallengesScreen = async (props: ChallengesScreenProps) => {
  const {theme} = useContext(ThemeContext);
  const styles = createStyles(theme);

//   const allChallenger = await importData();

//     alert(allChallenger);
//     alert(globalChallengesDB);
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
        data={globalChallengesDB}
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


