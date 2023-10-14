import React, { useState } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";
import TimePicker from "../TimePickers/TimePicker";
import { SaveButton } from "../ButtonWrapper/SaveButton";
import { Note } from "../../entities/note";
import notesService from "../../services/notesService";
import { useTranslation } from "react-i18next";

interface CalendarEventModalProps {
  onSave: (newNote: Note, oldNote: Note | null) => void;
  initialStartTime: Date;
  initialEndTime: Date;
}

const CalendarEventModal = (props: CalendarEventModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { onSave, initialStartTime, initialEndTime } = props;

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(initialStartTime);
  const [endDate, setEndDate] = useState(initialEndTime);
  const [summary, setSummary] = useState("");
  const { t } = useTranslation('status-calendar-screen')

  const onLocalSave = () => {
    const note = notesService.createNewNote(title, summary, startDate, endDate);

    if (note != null) {
      onSave(note, null);
    }
  }

  const renderInputContainer = () => (
    <View style={styles.inputContainer}>
      <View  style={styles.titleArea}>

      <TextInput
        style={styles.title}
        placeholder={t("modal-title-placeholder")}
        onChangeText={setTitle}
        value={title}
        placeholderTextColor={theme.colors.secondary}
      />
      </View>

      <View style={styles.timePicker}>
        <TimePicker
          onSetStartDate={setStartDate}
          onSetEndDate={setEndDate}
          initialStartDate={startDate}
          initialEndDate={endDate}
        />
      </View>
      <View         style={styles.summaryArea}>

      <TextInput
        multiline
        style={styles.summary}
        placeholder={t("modal-summary-placeholder")}
        onChangeText={setSummary}
        value={summary}
        placeholderTextColor={theme.colors.secondary}
      />
      </View>

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
    titleArea : {
      flex: 2,
      justifyContent: 'center',
    },
    title: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.canvasInverted,
      paddingBottom: 5,
      fontFamily: theme.fonts.bold,
      fontSize: 18,
      color: theme.colors.tertiary,
      paddingLeft: 10,
    },
    timePicker: {
      flex: 3,
      justifyContent: 'space-around',
      paddingLeft: 10,
    },
    summaryArea: {
      flex: 3,
    },
    summary: {
      borderTopWidth: 1,
      fontFamily: theme.fonts.medium,
      color: theme.colors.canvasInverted,
      borderColor: theme.colors.canvasInverted,
      paddingLeft: 10,
      fontSize: 14,
    },
    saveContainer: {
      flex: 1,
    }
  });

  return styles;
};

export default CalendarEventModal;
