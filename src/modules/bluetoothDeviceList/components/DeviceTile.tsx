import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BluetoothDeviceData } from "../../../models/bluetoothDeviceData";

const DeviceTile = (props: { device: BluetoothDeviceData; onSelect: any }) => {
  return (
    <TouchableOpacity style={styles.deviceTile} onPress={props.onSelect}>
      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/icons/cpu.png")}
      />
      <Text style={styles.deviceName}>{props.device.name}</Text>
      <Image
        style={styles.deviceIcon}
        source={require("../../../assets/icons/chevron-right.png")}
      />
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  deviceTile: {
    width: windowWidth * 0.95,
    backgroundColor: "#2E2E2E",
    padding: 20,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
  },
  deviceIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  deviceName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#FFF",
  },
});

export default DeviceTile;
