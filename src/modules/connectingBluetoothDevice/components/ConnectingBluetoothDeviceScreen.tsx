import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BluetoothDeviceData } from "../../../models/bluetoothDeviceData";
import Navigation from "../../common/components/navigation";

const ConnectingBluetoothDeviceScreen = ({ navigation, route }: any) => {
  const device: BluetoothDeviceData = route.params.device;
  const onConnect = () => {
    navigation.navigate("Main", { device });
  };

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <TouchableOpacity style={styles.circleContainer} onLongPress={onConnect}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              style={styles.circleIcon}
              source={require("../../../assets/icons/connecting.png")}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          We're trying to connect your device...
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
    backgroundColor: "#FA5788",
    borderRadius: windowWidth,
    width: windowWidth / 1.5,
    height: windowWidth / 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#C2185B",
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

export default ConnectingBluetoothDeviceScreen;
