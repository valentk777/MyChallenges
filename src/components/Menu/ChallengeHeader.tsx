import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { Challenge } from "../../entities/challenge";
import { MainStackParamList } from "../../navigators/MainStackNavigator";
import { icons } from "../../assets";
import { CircleButton } from "../ButtonWrapper/CircleButton";
import { customTheme } from "../../styles/customTheme";
import challengesService from "../../services/challengesService";

interface ChallengeHeaderProps {
    challenge: Challenge;
    navigation: NativeStackNavigationProp<MainStackParamList, "TotalCounterChallengeScreen", undefined>;
}

export const ChallengeHeader = ({ challenge, navigation }: ChallengeHeaderProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);

    const onDelete = async () => {
        const result = await challengesService.removeChallenge(challenge.id);

        if (result) {
            navigation.navigate('HomeTab');
        }
    }

    return (
        <View style={styles.container}>
            <CircleButton
                imgUrl={icons["back-arrow.png"]}
                onPress={() => navigation.goBack()}
                style={[styles.left, theme.shadows.dark]}
            />
            <CircleButton
                imgUrl={icons['trash.png']}
                onPress={async () => onDelete(challenge, navigation)}
                style={[styles.right, theme.shadows.dark]}
            />
        </View>
    )
};

const createStyles = (theme: typeof customTheme) => {
    const styles = StyleSheet.create({
        container: {
        },
        left: {
            left: 15,
            top: StatusBar.currentHeight / 2
        },
        right: {
            right: 15,
            top: StatusBar.currentHeight / 2
        },
    });

    return styles;
};
