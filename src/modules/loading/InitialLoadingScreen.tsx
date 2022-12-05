import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { readValue } from "../../services/StorageService";
import { ColorsEnum } from "../../models/enums/ColorsEnum";

const InitialLoadingScreen = ({ navigation }: any) => {
  useEffect(() => {
    const subscription = readValue(
      AsyncStorage,
      StorageKeysEnum.APP_INITIALIZED
    ).subscribe((initialized) => {
      // navigation.replace(ScreenNamesEnum.INITIAL);
      !!initialized && initialized == true
        ? navigation.replace(ScreenNamesEnum.CONTROLLER)
        : navigation.replace(ScreenNamesEnum.INITIAL);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={ColorsEnum.BLUE_DARK} />
      </View>
      <Text style={styles.instructionText}>Loading...</Text>
    </View>
  );
};

export default InitialLoadingScreen;
