import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import { useNavigation } from '@react-navigation/native';
import { ChallengeTypes } from '../../entities/challengeTypes';
import { icons } from '../../assets';

interface AddChallengeSelectionMenuProps extends TouchableOpacityProps {
}

export const AddChallengeSelectionMenu = (props: AddChallengeSelectionMenuProps) => {
  const { children } = props;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  const onShowPopup = () => {
    setShowPopup(true);
  }

  const onHidePopup = () => {
    setShowPopup(false);
  }

  const onSelectOption = (challengeType: ChallengeTypes) => {
    onHidePopup();

    if (challengeType === ChallengeTypes.TotalSimpleCounter) {
      navigation.navigate('AddTotalCounterChallengeScreen', { challengeType: challengeType, isDetailedCount: false, originalChallenge: null });
    }
    else if (challengeType === ChallengeTypes.TotalDetailedCounter) {
      navigation.navigate('AddTotalCounterChallengeScreen', { challengeType: challengeType, isDetailedCount: true, originalChallenge: null });
    }
    else if (challengeType === ChallengeTypes.DailyBolleanCalendar) {
      navigation.navigate('AddDailyCalendarChallengeScreen', { challengeType: challengeType, originalChallenge: null });
    }
    else if (challengeType === ChallengeTypes.EventLog) {
      navigation.navigate('AddDailyCalendarChallengeScreen', { challengeType: challengeType, originalChallenge: null });
    } else {
      Alert.alert("Unknown challenge type")
    }
  }

  return (
    <View
      style={{ ...styles.container, ...theme.shadows.primary }}
    >
      <TouchableOpacity onPress={onShowPopup}>
        <View style={styles.childrenContainer}>
          {children}
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showPopup}
        onRequestClose={onHidePopup}
      >
        {/* Create a black bachground and allow to close menu when pressing outside of menu */}
        <TouchableWithoutFeedback onPress={onHidePopup}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback >
        <View style={styles.modalContent}>
          <View style={styles.modalArea}>
            <View style={styles.space} />
            <TouchableWithoutFeedback onPress={() => onSelectOption(ChallengeTypes.TotalSimpleCounter)}>
              <View style={styles.buttonArea}>
                <Image
                  source={icons['number-blocks.png']}
                  resizeMode='contain'
                  style={styles.menuIcon} />
                <View style={styles.modalTextArea}>
                  <View style={styles.titleArea}>
                    <Text style={styles.menuTitle}>Simple Total Count</Text>
                  </View>
                  <Text style={styles.menuComment}>Attendance, event, travel, and item counting</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onSelectOption(ChallengeTypes.TotalDetailedCounter)}>
              <View style={styles.buttonArea}>
                <Image
                  source={icons['precision.png']}
                  resizeMode='contain'
                  style={styles.menuIcon} />
                <View style={styles.modalTextArea}>
                  <View style={styles.titleArea}>
                    <Text style={styles.menuTitle}>Total Detailed Count</Text>
                  </View>
                  <Text style={styles.menuComment}>Weight gain / loss, height counting</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {/* Number daily progress */}
            <TouchableWithoutFeedback onPress={() => onSelectOption(ChallengeTypes.DailyBolleanCalendar)}>
              <View style={styles.buttonArea}>
                <Image
                  source={icons['calendar.png']}
                  resizeMode='contain'
                  style={styles.menuIcon} />
                <View style={styles.modalTextArea}>
                  <View style={styles.titleArea}>
                    <Text style={styles.menuTitle}>Daily Progress</Text>
                  </View>
                  <Text style={styles.menuComment}>Daily routine, health, and reading habits</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {/* <TouchableWithoutFeedback onPress={() => onSelectOption(ChallengeTypes.EventLog)}>
              <View style={styles.buttonArea}>
                <Image
                  source={icons['logs.png']}
                  resizeMode='contain'
                  style={styles.menuIcon} />
                <View style={styles.modalTextArea}>
                <View style={styles.titleArea}>
                  <Text style={styles.menuTitle}>Detailed Event Log</Text>
                </View>
                  <Text style={styles.menuComment}>Sleep duration, savings, screen time tracking</Text>
                </View>
              </View>
            </TouchableWithoutFeedback> */}
            {/* Longest streak */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    childrenContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.colors.tertiary,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.7)'
    },
    space: {
      // this space allow buttons to grow on a screen when I add new ones
      flex: 6,
    },
    buttonArea: {
      flex: 1,
      backgroundColor: theme.colors.canvas,
      borderRadius: 10,
      margin: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'row',
    },
    modalArea: {
      flex: 1,
      width: '90%',
      alignItems: 'center',
      marginBottom: '5%',
      justifyContent: 'space-evenly'
    },
    modalTextArea: {
      flex: 1,
      width: '80%',
      flexDirection: 'column',
    },
    titleArea: {
      flex: 3,
      justifyContent: 'flex-end',
    },
    menuTitle: {
      fontSize: 20,
      fontFamily: theme.fonts.regular,
      color: theme.colors.primary,
    },
    menuIcon: {
      height: '35%',
      tintColor: theme.colors.tertiary,
    },
    menuComment: {
      flex: 2,
      fontSize: 12,
      fontFamily: theme.fonts.light,
      color: theme.colors.primary,
    }
  });

  return styles;
};
