import { View, Image, TouchableOpacity, Text } from "react-native";
import Navigation from "../common/Navigation";
import { styles } from "../../styles/styles";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { useEffect, useState } from "react";
import { readValue } from "../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { filter, retry, switchMap, tap } from "rxjs";
import {
  connectDeviceById,
  connectedDevice$,
  scanBluetoothDevices,
  scanningFinished$,
} from "../../services/BluetoothService";
import { BluetoothDeviceData } from "../../models/BluetoothDeviceData";
import DeviceInfo from "./components/DeviceInfo";

const ControllerScreen = ({ navigation }: any) => {
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDeviceData>();

  useEffect(() => {
    const subscription = connectedDevice$
      .pipe(
        filter((device) => device === null),
        tap((_) => scanBluetoothDevices(15000)),
        switchMap((_) => readValue(AsyncStorage, StorageKeysEnum.DEVICE)),
        tap((device) => setConnectedDevice(device)),
        switchMap((_) => scanningFinished$)
      )
      .subscribe((_) => connectDeviceById(connectedDevice!.id));

    return () => subscription.unsubscribe();
  }, []);

  const handleMeasure = () => {
    navigation.navigate(ScreenNamesEnum.MEASUREMENT);
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
      <DeviceInfo device={connectedDevice} />
    </View>
  );
};

export default ControllerScreen;
