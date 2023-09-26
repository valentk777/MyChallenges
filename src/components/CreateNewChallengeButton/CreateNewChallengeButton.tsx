import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { customTheme } from '../../styles/customTheme';
import { useNavigation } from '@react-navigation/native';
import { ChallengeTypes } from '../../entities/challengeTypes';

interface CreateNewChallengeButtonProps extends TouchableOpacityProps {
}

export const CreateNewChallengeButton = (props: CreateNewChallengeButtonProps) => {
  const { children } = props;

  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  const onShowPopup = () => {
    setShowPopup(true);
  }

  const onHidePopup = () => {
    setShowPopup(false);
  }

  const onSelectOption = (option: ChallengeTypes) => {
    onHidePopup();

    if (option === ChallengeTypes.Counter) {
      navigation.navigate('CreateNewChallengeScreen');
    }
    else if (option === ChallengeTypes.Steps) {
      navigation.navigate('CreateNewChallengeScreen');
    } else {
      Alert.alert("Unknown challenge type")
    }
  }

  return (
    <View
      style={{ ...styles.container, ...styles.shadow }}
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
            <TouchableWithoutFeedback onPress={() => onSelectOption(ChallengeTypes.Counter)}>
              <View style={styles.modalTile}>
                <Text style={styles.menuText}>Counter</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onSelectOption(ChallengeTypes.Steps)}>
              <View style={styles.modalTile}>
                <Text style={styles.menuText}>Steps</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadow: {
      shadowColor: theme.colors.input,
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 10,
      }
    },
    childrenContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.colors.input,
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
    modalArea: {
      width: '90%',
      height: '20%',
      alignItems: 'center',
      marginBottom: '5%',
    },
    modalTile: {
      flex: 1,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      margin: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    menuText: {
      fontSize: 22,
      fontFamily: theme.text.fontFamily,
      fontWeight: 'bold',
      color: theme.colors.black,
    }
  });

  return styles;
};
