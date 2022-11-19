import { View, Image, TouchableOpacity, Text } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";
import { startMeasurement } from "../../services/BluetoothService";

const ControllerScreen = ({ navigation }: any) => {
  const handleMeasure = () => {
    startMeasurement();
  };

  return (
    <View style={styles.container}>
      <Navigation navigation={navigation} title="Park Assist" />
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={handleMeasure}
        >
          <View style={[styles.outerCircle, styles.outerCircleYellow]}>
            <View style={[styles.innerCircle, styles.innerCircleYellow]}>
              <Image
                style={styles.circleIcon}
                source={require("../../assets/icons/ruler.png")}
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
      {/*<DeviceInfo device={device} />*/}
    </View>
  );
};

export default ControllerScreen;
