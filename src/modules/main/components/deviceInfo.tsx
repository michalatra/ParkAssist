import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { BluetoothDeviceData } from "../../../models/bluetoothDeviceData";

const DeviceInfo = (params: { device: BluetoothDeviceData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Info</Text>
      <View style={styles.item}>
        <Image
          style={styles.itemIcon}
          source={require("../../../assets/icons/cpu.png")}
        />
        <Text style={styles.itemText}>{params.device.name}</Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.itemIcon}
          source={require("../../../assets/icons/status.png")}
        />
        <Text style={styles.itemText}>{params.device.status}</Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2E2E2E",
    borderRadius: 20,
    padding: 20,
    width: windowWidth * 0.9,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 10,
  },
  item: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemIcon: {
    width: 25,
    height: 25,
    margin: 5,
    resizeMode: "contain",
  },
  itemText: {
    color: "#FFF",
    fontSize: 16,
    margin: 5,
  },
});

export default DeviceInfo;
