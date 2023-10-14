import React, { useState } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";
import TimePicker from "../TimePickers/TimePicker";
import { SaveButton } from "../ButtonWrapper/SaveButton";
import { Note } from "../../entities/note";
import notesService from "../../services/notesService";
import { useTranslation } from "react-i18next";
import { CircleButton } from "../ButtonWrapper/CircleButton";
import { icons } from "../../assets";

interface CalendarEventModalProps {
  onBack: () => void;
  onSave: (newNote: Note) => void;
  onDelete: (note: Note) => void;
  oldNote: Note | null;
  initialStartTime: Date;
  initialEndTime: Date;
}

const CalendarEventModal = (props: CalendarEventModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { onBack, onSave, onDelete, initialStartTime, initialEndTime, oldNote } = props;

  const isCreate = oldNote === null;

  const [title, setTitle] = useState(isCreate ? "" : oldNote.title);
  const [startDate, setStartDate] = useState(isCreate ? initialStartTime : new Date(oldNote.startTime));
  const [endDate, setEndDate] = useState(isCreate ? initialEndTime : new Date(oldNote.endTime));
  const [summary, setSummary] = useState(isCreate ? "" : oldNote.summary);
  const { t } = useTranslation('status-calendar-screen')

  const onLocalSave = () => {
    let note = notesService.createNewNote(title, summary, startDate, endDate, theme.colors.canvasInverted);

    if (note == null) {
      return;
    }

    if (!isCreate) {
      note.id = oldNote.id;
    }

    onSave(note);
  }

  const onLocalDelete = () => {
    if (isCreate) {
      onBack();
    } else {
      onDelete(oldNote);
    }
  }

  const renderHeaderContainer = () => (
    <View style={styles.headerContainer}>
      <CircleButton
        imgUrl={icons["back-arrow.png"]}
        onPress={onBack}
        style={[styles.back, theme.shadows.dark]}
      />
      <CircleButton
        imgUrl={icons['trash.png']}
        onPress={onLocalDelete}
        style={[styles.trash, theme.shadows.dark]}
      />
    </View>
  );

  const renderInputContainer = () => (
    <View style={styles.inputContainer}>
      <View style={styles.titleArea}>
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
      <View style={styles.summaryArea}>
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
        title={t("save")}
        onPress={onLocalSave}
        isRoundBottom={true}
        roundRadius={20}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior='height'>
      <View style={styles.container}>
        {renderHeaderContainer()}
        <View style={styles.aligment}>
          <View style={styles.modalBoxContainer}>
            {renderInputContainer()}
          </View>
        </View>
        {renderSaveContainer()}
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
      // alignItems: 'center',
      backgroundColor: theme.colors.canvas,
    },
    headerContainer: {
      flex: 1,
      borderRadius: 0,
    },
    back: {
      left: 15,
      top: 5,
      // backgroundColor: theme.colors.tertiary
    },
    trash: {
      right: 15,
      top: 5,
      // backgroundColor: theme.colors.tertiary
    },
    aligment: {
      flex: 10,
      alignItems: 'center',
    },
    modalBoxContainer: {
      flex: 1,
      width: '80%',
    },
    inputContainer: {
      flex: 11,
    },
    titleArea: {
      flex: 2,
      justifyContent: 'center',
    },
    title: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.canvasInverted,
      paddingBottom: 7,
      fontFamily: theme.fonts.bold,
      fontSize: 18,
      color: theme.colors.tertiary,
      paddingLeft: 10,
    },
    timePicker: {
      flex: 2,
      justifyContent: 'space-around',
      paddingLeft: 10,
      marginBottom: 20,
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
      flex: 2,
    },
  });

  return styles;
};

export default CalendarEventModal;
