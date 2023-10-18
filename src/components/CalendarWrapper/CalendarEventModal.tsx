import React, { useState } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Text } from "react-native";
import { AppTheme } from "../../styles/themeModels";
import { useTheme } from "../../hooks/useTheme";
import TimePicker from "../TimePickers/TimePicker";
import { SaveButton } from "../ButtonWrapper/SaveButton";
import { Note } from "../../entities/note";
import notesService from "../../services/notesService";
import { useTranslation } from "react-i18next";
import { CircleButton } from "../ButtonWrapper/CircleButton";
import { icons } from "../../assets";
import CheckBox from '@react-native-community/checkbox';
import timeService2 from "../../services/timeService2";

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

  const isNewNote = oldNote === null;

  const [title, setTitle] = useState(isNewNote ? "" : oldNote.title);
  const [startDate, setStartDate] = useState(isNewNote ? initialStartTime : new Date(oldNote.startTime));
  const [endDate, setEndDate] = useState(isNewNote ? initialEndTime : new Date(oldNote.endTime));
  const [summary, setSummary] = useState(isNewNote ? "" : oldNote.summary);
  const [isFullDayEvent, setIsFullDayEvent] = useState(isNewNote ? initialStartTime == initialEndTime : oldNote.isFullDayEvent);

  const { t } = useTranslation('status-calendar-screen')

  const onLocalSave = () => {
    let note = null as Note | null;

    if (isFullDayEvent) {
      note = notesService.createNewNote(title, summary, timeService2.setUtcTimeToDate(startDate, 0, 0), timeService2.setUtcTimeToDate(endDate, 0, 0), "", isFullDayEvent);
    } else {
      note = notesService.createNewNote(title, summary, startDate, endDate, "", isFullDayEvent);
    }

    if (note == null) {
      return;
    }

    if (!isNewNote) {
      note.id = oldNote.id;
      note.timeCreated = oldNote.timeCreated;
      note.color = oldNote.color;
    }

    onSave(note);
  }

  const onLocalDelete = () => {
    if (isNewNote) {
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
          disabled={isFullDayEvent}
        />
        <View style={styles.checkBoxArea}>
          <CheckBox
            onValueChange={(newValue) => { setIsFullDayEvent(newValue) }}
            value={isFullDayEvent}
          />
          <Text style={styles.checkBoxText}>{t("checkbox")}</Text>
        </View>
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
      backgroundColor: theme.colors.canvas,
    },
    headerContainer: {
      flex: 1,
      borderRadius: 0,
    },
    back: {
      left: 15,
      top: 5,
    },
    trash: {
      right: 15,
      top: 5,
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
      color: theme.colors.secondary,
      paddingLeft: 10,
    },
    timePicker: {
      flex: 3,
      justifyContent: 'space-around',
      paddingLeft: 10,
      marginBottom: 20,
    },
    checkBoxArea: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    checkBoxText: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.primary,
      fontSize: 14,
    },
    summaryArea: {
      flex: 3,
    },
    summary: {
      borderTopWidth: 1,
      fontFamily: theme.fonts.regular,
      color: theme.colors.secondary,
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
