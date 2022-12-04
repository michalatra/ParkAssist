import { View, Text, Image } from "react-native";
import Navigation from "../../common/Navigation";
import { styles } from "../../../styles/styles";
import { useEffect } from "react";
import {
  connectDeviceById,
  connectedDevice$,
  connectingFinishedSuccessfully$,
} from "../../../services/BluetoothService";
import { switchMap } from "rxjs";
import { saveValue } from "../../../services/StorageService";
import { StorageKeysEnum } from "../../../models/enums/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";

const BluetoothConnectionAttemptScreen = ({ navigation, route }: any) => {
  const deviceId: string = route.params.deviceId;
  const returnScreen: string = route.params.returnScreen;

  const onConnect = () => {
    connectedDevice$
      .pipe(
        switchMap((device) =>
          saveValue(AsyncStorage, StorageKeysEnum.DEVICE, {
            name: device?.name,
            id: device?.id,
          })
        )
      )
      .subscribe((_) => {
        navigation.reset({
          index: 0,
          routes: [
            { name: ScreenNamesEnum.CONTROLLER },
            { name: returnScreen },
          ],
        });
      });
  };

  useEffect(() => {
    connectDeviceById(deviceId);
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
      <View style={styles.circleContainer}>
        <View style={[styles.outerCircle, styles.outerCirclePink]}>
          <View style={[styles.innerCircle, styles.innerCirclePink]}>
            <Image
              style={styles.circleIcon}
              source={require("../../../assets/icons/connecting.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          We're trying to connect your device...
        </Text>
      </View>
    </View>
  );
};

export default BluetoothConnectionAttemptScreen;
