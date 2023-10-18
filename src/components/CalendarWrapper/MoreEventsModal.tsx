import React, { useEffect } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import BlackScreenModal from '../Modals/BlackScreenModal';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import { useTranslations } from '../../hooks/useTranslations';
import { icons } from '../../assets';
import { useTranslation } from 'react-i18next';
import { CustomCalendarEvent } from '../../entities/customCalendarEvent';

interface MoreEventsModalProps {
  data: CustomCalendarEvent[];
  isModalVisible: boolean;
  onHideModal: () => void;
  onItemPress: (item: CustomCalendarEvent) => void
}

const MoreEventsModal = (props: MoreEventsModalProps) => {
  const { data, isModalVisible, onHideModal, onItemPress } = props;

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
    <BlackScreenModal isModalVisible={isModalVisible} onHideModal={onHideModal}>
      <View style={{ ...styles.moreEventsModalContainer, width: window.width * 0.8, height: window.height * 0.8 }}>
        <FlatList
          data={data}
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
    moreEventsContainer: {
      // flex: 1,
      // top: 0,
      // height: 250,
      // width: 250,
      // backgroundColor: 'green'
      // justifyContent: 'center',
      // alignItems: 'flex-start',
      // borderStartColor: 'green',
    },
    moreEventsModalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      // top: 0,
      padding: 20,
      // flex: 0.8,
      backgroundColor: theme.colors.primary
    },
    moreEventsItemContainer: {
      flex: 1,
      height: 90,
      marginBottom: 10,
      // borderTopColor: theme.colors.canvasInverted,
      // borderTopWidth: 1,
      // borderBottomColor: theme.colors.canvasInverted,
      // borderBottomWidth: 1,
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
      // paddingLeft: 5,
      fontFamily: theme.fonts.medium,
      color: theme.colors.primary,
    },
    timeArea: {
      flex: 2,
      flexDirection: 'row',
      // marginTop: 5,
      // paddingLeft: 5,
      justifyContent: 'flex-start',

      // backgroundColor: 'green'
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
