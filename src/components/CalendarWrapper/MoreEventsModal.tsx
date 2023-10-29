import React from 'react';
import { View, StyleSheet, Text, useWindowDimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import BlackScreenModal from '../Modals/BlackScreenModal';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import { useTranslations } from '../../hooks/useTranslations';
import { icons } from '../../assets';
import { useTranslation } from 'react-i18next';
import { CustomCalendarEvent } from '../../entities/customCalendarEvent';

interface MoreEventsModalProps {
  date: Date;
  events: CustomCalendarEvent[];
  isModalVisible: boolean;
  onHideModal: () => void;
  onItemPress: (item: CustomCalendarEvent) => void
  onBackgroundPress: () => void
}

const MoreEventsModal = (props: MoreEventsModalProps) => {
  const { date, events, isModalVisible, onHideModal, onItemPress, onBackgroundPress } = props;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const window = useWindowDimensions();

  const { t } = useTranslation('status-calendar-screen');
  const { tTime } = useTranslations();

  const renderItem = (event: CustomCalendarEvent, index: number) => {
    return (
      <TouchableOpacity style={[styles.moreEventsItemContainer, { width: window.width * 0.7 }, theme.shadows.primary]} onPress={() => { onItemPress(event) }}>
        <View style={styles.rowDirection}>
          <View style={styles.textArea}>
            <View style={styles.titleArea}>
              <Text style={styles.title}>{event.title}</Text>
            </View>
            <View style={[styles.timeArea, { alignItems: 'flex-end' }]}>
              <Text style={styles.time}>{event.isFullDayEvent ? t("full-day-event") : tTime(event.start.toISOString(), 'HH:ss, LLL do, YYY')}</Text>
            </View>
            <View style={[styles.timeArea, { alignItems: 'flex-start' }]}>
              <Text style={styles.time}>{event.isFullDayEvent ? "" : tTime(event.end.toISOString(), 'HH:ss, LLL do, YYY')}</Text>
            </View>
          </View>
          <View style={styles.arrowArea}>
            <Image
              source={icons['angle-right.png']}
              resizeMode='contain'
              style={styles.arrowIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BlackScreenModal
      isModalVisible={isModalVisible}
      onHideModal={onHideModal}
      onBackgroundPress={onBackgroundPress}
    >
      <View style={{ ...styles.moreEventsModalContainer, width: window.width * 0.8, height: window.height * 0.8 }}>
        <View style={styles.dateTextArea}>
          <Text style={styles.dateText}>{tTime(date.toISOString(), 'LLL do, YYY')}</Text>

        </View>
        <FlatList
          data={events}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={item => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </BlackScreenModal>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    dateTextArea: {
      height: 40
    },
    dateText: {
      fontSize: 15,
      fontFamily: theme.fonts.bold,
      color: theme.colors.canvas,
    },
    moreEventsModalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      padding: 20,
      backgroundColor: theme.colors.primary
    },
    moreEventsItemContainer: {
      flex: 1,
      height: 90,
      marginBottom: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.canvas,
      borderRadius: 10,
    },
    rowDirection: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingLeft: 15,
    },
    textArea: {
      flex: 7,
      flexDirection: 'column',
    },
    titleArea: {
      flex: 3,
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomColor: theme.colors.canvasInverted,
      borderBottomWidth: 1,
    },
    title: {
      flex: 1,
      fontSize: 15,
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
    },
    timeArea: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    time: {
      fontSize: 10,
      fontFamily: theme.fonts.light,
      color: theme.colors.primary,
    },
    arrowArea: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowIcon: {
      height: '25%',
      aspectRatio: 1,
      tintColor: theme.colors.canvasInverted,
    },
  });

  return styles;
};

export default MoreEventsModal;
