import { View, Text, Image, TouchableOpacity } from "react-native";
import Navigation from "../../common/Navigation";
import { styles } from "../../../styles/styles";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";

const BluetoothSearchInitScreen = ({ navigation, route }: any) => {
  const returnScreen: string = route.params.returnScreen;

  const searchDevices = () => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_SEARCH_RESULTS, {
      returnScreen,
    });
  };

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <TouchableOpacity style={styles.circleContainer} onPress={searchDevices}>
        <View style={[styles.outerCircle, styles.outerCircleBlue]}>
          <View style={[styles.innerCircle, styles.innerCircleBlue]}>
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

export default BluetoothSearchInitScreen;
