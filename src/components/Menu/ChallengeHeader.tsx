import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { Challenge } from "../../entities/challenge";
import { MainStackParamList } from "../../navigators/MainStackNavigator";
import { icons } from "../../assets";
import { CircleButton } from "../ButtonWrapper/CircleButton";
import { customTheme } from "../../styles/customTheme";
import challengesService from "../../services/challengesService";

interface ChallengeHeaderProps {
  challenge: Challenge;
  navigation: NativeStackNavigationProp<MainStackParamList, "TotalCounterChallengeScreen", undefined>;
  onEdit: () => void;
}

export const ChallengeHeader = ({ challenge, navigation, onEdit }: ChallengeHeaderProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const onDelete = async () => {
    const result = await challengesService.removeChallenge(challenge.id);

    if (result) {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <CircleButton
        imgUrl={icons["back-arrow.png"]}
        onPress={() => navigation.goBack()}
        style={[styles.back, theme.shadows.dark]}
      />
      <CircleButton
        imgUrl={icons['editing.png']}
        onPress={onEdit}
        style={[styles.edit, theme.shadows.dark]}
      />
      <CircleButton
        imgUrl={icons['trash.png']}
        onPress={onDelete}
        style={[styles.trash, theme.shadows.dark]}
      />
    </View>
  )
};

const createStyles = (theme: typeof customTheme) => {
  const styles = StyleSheet.create({
    container: {
    },
    back: {
      left: 15,
      top: StatusBar.currentHeight / 2
    },
    edit: {
      right: 65,
      top: StatusBar.currentHeight / 2
    },
    trash: {
      right: 15,
      top: StatusBar.currentHeight / 2
    },
  });

  return styles;
};
