import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { HomeStackParamList } from '../navigators/MenuTabNavigator';
import { ChallengesList } from '../components/ChallengesList/ChallengesList';
import { ChallengeFilteringOptions } from '../entities/challengeFilters';

type ChallengesScreen2Props = NativeStackScreenProps<HomeStackParamList, 'ChallengesScreen2'>;

const ChallengesScreen2 = ({ navigation }: ChallengesScreen2Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.9, y: 0 }}
        locations={[0, 0.6, 1]}
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <ChallengesList navigation={navigation} filteringOptions={ChallengeFilteringOptions.All} />
      </LinearGradient>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearGradient: {
      flex: 15,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary]
    },
  });

  return styles;
};

export default ChallengesScreen2;
