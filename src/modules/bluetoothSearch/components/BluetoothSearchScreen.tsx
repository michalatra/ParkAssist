import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Navigation from "../../common/components/navigation";
import {BluetoothDeviceStatusEnum} from "../../../models/enums/bluetoothDeviceStatusEnum";

const BluetoothSearchScreen = ({ navigation }: any) => {
  const searchDevices = () => {
    navigation.navigate("DeviceFound", {
      devices: [
        {
          name: "Test Device Name 1",
          id: "0",
          status: BluetoothDeviceStatusEnum.CONNECTED,
        },
        {
          name: "Test Device Name 2",
          id: "1",
          status: BluetoothDeviceStatusEnum.CONNECTED,
        },
        {
          name: "Test Device Name 3",
          id: "2",
          status: BluetoothDeviceStatusEnum.CONNECTED,
        },
        {
          name: "Test Device Name 4",
          id: "3",
          status: BluetoothDeviceStatusEnum.CONNECTED,
        },
        {
          name: "Test Device Name 5",
          id: "4",
          status: BluetoothDeviceStatusEnum.CONNECTED,
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <TouchableOpacity
        style={styles.circleContainer}
        onLongPress={searchDevices}
      >
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              style={styles.circleIcon}
              source={require("../../../assets/icons/bluetooth.png")}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Tap Bluetooth Icon to start Detector Search
        </Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 80,
  },
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  outerCircle: {
    backgroundColor: "#629749",
    borderRadius: windowWidth,
    width: windowWidth / 1.5,
    height: windowWidth / 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#33691E",
    borderRadius: windowWidth,
    width: windowWidth / 1.8,
    height: windowWidth / 1.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleIcon: {
    width: "60%",
    resizeMode: "contain",
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

export default BluetoothSearchScreen;
