import { View, StyleSheet, Text } from "react-native";
import { BluetoothDeviceData } from "../../../models/bluetoothDeviceData";
import Navigation from "../../common/components/navigation";
import DeviceList from "./deviceList";
import {useEffect, useState} from "react";

const DevicesFoundScreen = ({ navigation, route }: any) => {
  const [bluetoothState, setBluetoothState] = useState("");

  const devices: BluetoothDeviceData[] = route.params.devices;

  const handleDeviceSelect = (device: BluetoothDeviceData) => {
    navigation.navigate("DeviceConnect", { device });
  };

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <DeviceList devices={devices} onSelect={handleDeviceSelect} />
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{bluetoothState}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 80,
  },
  instructionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  instructionText: {
    textAlign: "center",
    lineHeight: 45,
    width: "80%",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default DevicesFoundScreen;
