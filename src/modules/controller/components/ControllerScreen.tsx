import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BluetoothDeviceData } from "../../../models/bluetoothDeviceData";
import Navigation from "../../common/components/navigation";
import DeviceInfo from "./DeviceInfo";

const ControllerScreen = ({ navigation, route }: any) => {
  const device: BluetoothDeviceData = route.params.device;

  const handleMeasure = () => {};

  return (
    <View style={styles.container}>
      <Navigation navigation={navigation} title="Park Assist" />
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.circleContainer}
          onLongPress={handleMeasure}
        >
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Image
                style={styles.circleIcon}
                source={require("../../../assets/icons/ruler.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Tap to begin the measurement
          </Text>
        </View>
      </View>
      <DeviceInfo device={device} />
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 80,
  },
  actionContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    flex: 0.6,
    alignItems: "center",
  },
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  outerCircle: {
    backgroundColor: "#FFD149",
    borderRadius: windowWidth,
    width: windowWidth / 1.8,
    height: windowWidth / 1.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#FFA000",
    borderRadius: windowWidth,
    width: windowWidth / 2.2,
    height: windowWidth / 2.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleIcon: {
    width: "60%",
    resizeMode: "contain",
  },
  instructionContainer: {
    marginTop: 45,
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

export default ControllerScreen;
