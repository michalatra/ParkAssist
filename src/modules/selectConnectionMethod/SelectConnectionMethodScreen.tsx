import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/styles";
import Navigation from "../common/Navigation";
import { useToast } from "react-native-toast-notifications";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";

const SelectConnectionMethodScreen = ({ navigation }: any) => {
  const toast = useToast();

  const onBluetoothSelect = () => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_SEARCH_INIT, {
      returnScreen: ScreenNamesEnum.DETECTORS_QUANTITY_SETUP,
    });
  };

  const onWiFiSelect = () => {
    //TODO: WiFi connection
    toast.show("WiFi connection is not implemented yet.");
  };

  return (
    <View style={styles.container}>
      <Navigation
        title="Find Detectors Nearby"
        navigation={navigation}
        showSettings={false}
      />
      <TouchableOpacity
        onPress={onBluetoothSelect}
        style={[
          styles.connectionMethodContainer,
          styles.connectionMethodContainerBlue,
        ]}
      >
        <Image
          style={styles.connectionMethodIcon}
          source={require("../../assets/icons/bluetooth.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onWiFiSelect}
        style={[
          styles.connectionMethodContainer,
          styles.connectionMethodContainerGreen,
        ]}
      >
        <Image
          style={styles.connectionMethodIcon}
          source={require("../../assets/icons/Wifi.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SelectConnectionMethodScreen;
