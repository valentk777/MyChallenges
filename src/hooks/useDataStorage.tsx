import AsyncStorage from "@react-native-async-storage/async-storage";
import { Challenge } from "../entities/challenge";
import { Alert } from "react-native";

export const storeData = async (value: Challenge) => {
    try {
        const jsonValue = JSON.stringify(value);

        await AsyncStorage.setItem(value.id, jsonValue);

        return true;
    } catch (exception) {
        Alert.alert("Error saving to storage")

        if (exception instanceof Error) {
            console.log("Error saving to storage", exception.message);
        } else {
            console.log("Unexpected error", exception);
        }

        return false;
    }
};

export const removeData = async (value: Challenge) => {
    try {
        await AsyncStorage.removeItem(value.id);

        return true;
    }
    catch (exception) {
        Alert.alert("Error deleting item from storage")

        if (exception instanceof Error) {
            console.log("Error deleting item from storage", exception.message);
        } else {
            console.log("Unexpected error", exception);
        }

        return false;
    }
};
