import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import LinearGradient from 'react-native-linear-gradient'
import { HomeStackParamList } from '../navigators/MenuTabNavigator';
import StatusAndNotesCalendar from '../components/CalendarWrapper/StatusAndNotesCalendar';

type StatusCalendarScreenProps = NativeStackScreenProps<HomeStackParamList, 'StatusCalendarScreen'>;

export const StatusCalendarScreen = ({ navigation }: StatusCalendarScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const window = useWindowDimensions();

  return (
    <View style={{ ...styles.container, height: window.height }}>
      <LinearGradient
        colors={styles.linearGradient.colors}
        style={styles.linearGradient}
      >
        <View style={{ ...styles.section, height: window.height - 150 }}>
          <StatusAndNotesCalendar />
        </View>
      </LinearGradient>
    </View >
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
    },
    linearGradient: {
      flex: 1,
      colors: [theme.colors.primary, theme.colors.secondary, theme.colors.primary]
    },
    section: {
      // backgroundColor: theme.colors.canvas
    },
    text: {
      fontSize: 20,
      lineHeight: 21,
      fontFamily: theme.fonts.light,
      fontWeight: 'bold',
      color: theme.colors.canvas,
      marginTop: 30,
    },
  });

  return styles;
};

export default StatusCalendarScreen;
