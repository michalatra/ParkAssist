import { View, Text, Image, TouchableOpacity } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";
import { useEffect } from "react";
import {
  connectDevice,
  connectingFinishedSuccessfully$,
} from "../../services/BluetoothService";

const ConnectingBluetoothDeviceScreen = ({ navigation, route }: any) => {
  const deviceId: string = route.params.deviceId;
  const onConnect = () => {
    navigation.navigate("Main");
  };

  useEffect(() => {
    connectDevice(deviceId);
  }, []);

  useEffect(() => {
    const subscription = connectingFinishedSuccessfully$.subscribe((_) =>
      onConnect()
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <TouchableOpacity style={styles.circleContainer} onLongPress={onConnect}>
        <View style={[styles.outerCircle, styles.outerCirclePink]}>
          <View style={[styles.innerCircle, styles.innerCirclePink]}>
            <Image
              style={styles.circleIcon}
              source={require("../../assets/icons/connecting.png")}
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

export default ConnectingBluetoothDeviceScreen;
