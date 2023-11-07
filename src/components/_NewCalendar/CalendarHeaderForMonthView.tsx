import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { AppTheme } from '../../styles/themeModels'
import { useTranslations } from '../../hooks/useTranslations'
import { CircleButton } from '../ButtonWrapper/CircleButton'
import { icons } from '../../assets'
import { hourPickerLocales } from '../../external/i18next/translations/hourPickerLocales'
import { useTranslation } from 'react-i18next'
import React from 'react'

export type WeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface CalendarHeaderForMonthViewProps {
  onToday: () => void;
  currentDate: Date;
}

const _CalendarHeaderForMonthView = ({ onToday, currentDate }: CalendarHeaderForMonthViewProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { t } = useTranslation('status-calendar-screen');
  const { currentLanguage, tTime } = useTranslations();

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <CircleButton
          imgUrl={icons['today-calendar.png']}
          onPress={onToday}
          style={[styles.month, theme.shadows.dark]}
        />
        <View style={styles.montTitleArea}>
          <Text style={styles.montTitle}>
            {tTime(currentDate.toISOString(), 'yyyy MMMM')}
          </Text>
        </View>
      </View>
      <View style={styles.weekDaysRow}>
        {[...hourPickerLocales[currentLanguage].dayNamesShort.slice(1, 7), hourPickerLocales[currentLanguage].dayNamesShort[0]].map((day, index) => (
          <Text key={day} style={styles.dayNameShortText}>{t(day)}</Text>
        ))}
      </View>
    </View>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary
    },
    buttonRow: {
      flex: 5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    montTitleArea: {
      justifyContent: 'center',
      alignContent: 'center',
    },
    montTitle: {
      fontFamily: theme.fonts.medium,
      fontSize: 18,
      color: theme.colors.tertiary,
    },
    month: {
      left: 15,
      top: 10,
    },
    weekDaysRow: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayNameShortText: {
      fontFamily: theme.fonts.medium,
      fontSize: 14,
      color: theme.colors.tertiary,
    },
  });

  return styles;
};

export const CalendarHeaderForMonthView = React.memo(_CalendarHeaderForMonthView)
