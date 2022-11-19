import { View, Text, Image, TouchableOpacity } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";

const BluetoothSearchScreen = ({ navigation }: any) => {
  const searchDevices = () => {
    navigation.navigate("DeviceFound");
  };

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <TouchableOpacity style={styles.circleContainer} onPress={searchDevices}>
        <View style={[styles.outerCircle, styles.outerCircleGreen]}>
          <View style={[styles.innerCircle, styles.innerCircleGreen]}>
            <Image
              style={styles.circleIcon}
              source={require("../../assets/icons/bluetooth.png")}
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

export default BluetoothSearchScreen;
