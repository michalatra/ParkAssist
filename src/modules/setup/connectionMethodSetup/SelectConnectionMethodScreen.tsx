import React, { useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../../styles/styles";
import { useToast } from "react-native-toast-notifications";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import NavBar from "../../common/NavBar";
import WavyBackground from "../../common/WavyBackground";
import { ColorsEnum } from "../../../models/enums/ColorsEnum";
import { ConnectionMethodEnum } from "../../../models/enums/ConnectionMethodEnum";
import ActionButton from "../../common/ActionButton";
import useLanguage from "../../../language/LanguageHook";

const SelectConnectionMethodScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();
  const [connectionMethod, setConnectionMethod] =
    useState<ConnectionMethodEnum | null>(null);
  const toast = useToast();

  const onSelect = (method: ConnectionMethodEnum) => {
    setConnectionMethod(method);
  };

  const handleContinue = () => {
    if (connectionMethod === null) return;

    if (connectionMethod === ConnectionMethodEnum.BLUETOOTH) {
      onBluetoothSelect();
    } else {
      onWiFiSelect();
    }
  };

  const onBluetoothSelect = () => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_SCAN_INIT, {
      returnScreen: ScreenNamesEnum.DETECTORS_SETUP,
    });
  };

  const onWiFiSelect = () => {
    //TODO: WiFi connection
    toast.show("WiFi connection is not implemented yet.");
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.PINK_DARK} />
      <NavBar navigation={navigation} showSettings={false} showHelp={true} />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE ? LANGUAGE.CONNECTION_METHOD.INSTRUCTION : ""}
          </Text>
        </View>
        <View style={styles.connectionMethodsContainer}>
          <TouchableOpacity
            onPress={() => onSelect(ConnectionMethodEnum.BLUETOOTH)}
            style={[
              connectionMethod === ConnectionMethodEnum.BLUETOOTH
                ? styles.connectionMethodContainerActive
                : styles.connectionMethodContainer,
            ]}
          >
            <Image
              style={[
                connectionMethod === ConnectionMethodEnum.BLUETOOTH
                  ? styles.connectionMethodIconActive
                  : styles.connectionMethodIcon,
              ]}
              source={require("../../../assets/icons/bluetooth.png")}
            />
            <Text
              style={
                connectionMethod === ConnectionMethodEnum.BLUETOOTH
                  ? styles.connectionMethodTextActive
                  : styles.connectionMethodText
              }
            >
              {LANGUAGE ? LANGUAGE.CONNECTION_METHOD.BLUETOOTH : ""}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSelect(ConnectionMethodEnum.WIFI)}
            style={[
              connectionMethod === ConnectionMethodEnum.WIFI
                ? styles.connectionMethodContainerActive
                : styles.connectionMethodContainer,
            ]}
          >
            <Image
              style={[
                connectionMethod === ConnectionMethodEnum.WIFI
                  ? styles.connectionMethodIconActive
                  : styles.connectionMethodIcon,
              ]}
              source={require("../../../assets/icons/Wifi.png")}
            />
            <Text
              style={
                connectionMethod === ConnectionMethodEnum.WIFI
                  ? styles.connectionMethodTextActive
                  : styles.connectionMethodText
              }
            >
              {LANGUAGE ? LANGUAGE.CONNECTION_METHOD.WIFI : ""}
            </Text>
          </TouchableOpacity>
        </View>
        <ActionButton
          title={LANGUAGE ? LANGUAGE.CONNECTION_METHOD.CONTINUE : ""}
          action={handleContinue}
          disabled={connectionMethod === null}
        />
      </View>
    </View>
  );
};

export default SelectConnectionMethodScreen;
