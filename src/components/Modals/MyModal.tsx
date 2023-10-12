import React from "react";
import { View, Modal, TouchableWithoutFeedback, StyleSheet, useWindowDimensions } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";

interface MyModalProps {
  children?: React.ReactNode | undefined;
  isModalVisible: boolean;
  hideModal: () => void;
}

const MyModal = (props: MyModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const window = useWindowDimensions();

  const { children, isModalVisible, hideModal } = props;

  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback onPress={hideModal}>
        <View style={{ ...styles.modalBackground, height: window.height }}>
        <TouchableWithoutFeedback onPress={() => {}}>
        {/* <View style={styles.modalContainer}> */}
            {children}
            {/* </View> */}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    modalBackground: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      // backgroundColor: 'blue',
      // justifyContent: 'center',
      // alignItems: 'center',
      // width: '100%',
      // width: '100%',
      // height:'100%',
      // width: 300,
      // height: 200,
      // backgroundColor: 'white',
      // borderRadius: 10,
      // padding: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
  });

  return styles;
};

export default MyModal;
