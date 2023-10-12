import React, { useState } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";
import TimePicker from "../TimePickers/TimePicker";
import { SaveButton } from "../ButtonWrapper/SaveButton";
import { Note } from "../../entities/note";
import notesService from "../../services/notesService";

interface AddEventInputAreaProps {
  onSave: (newNote: Note) => void;
}

const AddEventInputArea = (props: AddEventInputAreaProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { onSave } = props;

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const onLocalSave = () => {
    const note = notesService.createNewNote(title, description, startDate, endDate);

    console.log(note);
    // onSave(note);
  }

  const renderInputContainer = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.title}
        // placeholder={t("title-placeholder")}
        placeholder={"Add title"}
        onChangeText={setTitle}
        value={title}
        placeholderTextColor={theme.colors.secondary}
      />
      <View style={styles.timePicker}>
        <TimePicker
          onSetStartDate={setStartDate}
          onSetEndDate={setEndDate}
        />
      </View>
      <TextInput
        multiline
        style={styles.description}
        // placeholder={t("title-placeholder")}
        placeholder={"Add description"}
        onChangeText={setDescription}
        value={description}
        placeholderTextColor={theme.colors.secondary}
      />
    </View>
  );

  const renderSaveContainer = () => (
    <View style={styles.saveContainer}>
      <SaveButton
        // title={t("save")}
        title={"save"}
        onPress={onLocalSave}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior='height'>

      <View style={styles.container}>
        <View style={styles.modalBoxContainer}>
          {renderInputContainer()}
          {renderSaveContainer()}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'center',
      backgroundColor: theme.colors.canvas,
    },
    modalBoxContainer: {
      flex: 1,
      width: '80%',
    },
    inputContainer: {
      flex: 5,
    },
    title: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.canvasInverted,
      paddingBottom: 0,
      marginVertical: 20,
      padding: 0,
      fontFamily: theme.fonts.bold,
      fontSize: 18,
      color: theme.colors.secondary,
    },
    timePicker: {
      flex: 2,
      justifyContent: 'center',
    },
    description: {
      flex: 2,
      borderWidth: 1,
      marginVertical: 20,
      fontFamily: theme.fonts.light,
      color: theme.colors.canvasInverted,
      borderBottomColor: theme.colors.canvasInverted,
    },
    saveContainer: {
      flex: 1,
    }
  });

  return styles;
};

export default AddEventInputArea;
