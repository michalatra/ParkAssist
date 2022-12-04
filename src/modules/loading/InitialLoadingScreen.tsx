import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";

const InitialLoadingScreen = ({ navigation }: any) => {
  useEffect(() => {
    AsyncStorage.getItem(StorageKeysEnum.APP_INITIALIZED).then((initialized) =>
      !!initialized && initialized == "true"
        ? navigation.replace(ScreenNamesEnum.CONTROLLER)
        : navigation.replace(ScreenNamesEnum.INITIAL)
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Loading...</Text>
    </View>
  );
};

export default InitialLoadingScreen;
