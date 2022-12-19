import { View, Text, Image } from "react-native";
import Navigation from "../../common/Navigation";
import { styles } from "../../../styles/styles";
import { useEffect } from "react";
import {
  connectDeviceById,
  connectedDevice$,
  connectingFinishedSuccessfully$,
} from "../../../services/BluetoothService";
import { catchError, empty, first, switchMap } from "rxjs";
import { saveValue } from "../../../services/StorageService";
import { StorageKeysEnum } from "../../../models/enums/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { useToast } from "react-native-toast-notifications";

const BluetoothConnectionAttemptScreen = ({ navigation, route }: any) => {
  const deviceId: string = route.params.deviceId;
  const returnScreen: string = route.params.returnScreen
    ? route.params.returnScreen
    : ScreenNamesEnum.CONTROLLER;

  const toast = useToast();

  const onConnect = () => {
    connectedDevice$
      .pipe(
        first(),
        switchMap((device) =>
          saveValue(AsyncStorage, StorageKeysEnum.DEVICE, {
            name: device?.name,
            id: device?.id,
          })
        )
      )
      .subscribe((_) => {
        toast.show("Connected successfully", { type: "success" });
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
    const subscription = connectDeviceById(deviceId)
      .pipe(
        catchError((_) => {
          toast.show("Connection failed", { type: "error" });
          navigation.goBack();
          return empty();
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = connectingFinishedSuccessfully$.subscribe((_) =>
      onConnect()
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Navigation
        title="Find Detectors Nearby"
        navigation={navigation}
        showSettings={false}
      />
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
      <View style={styles.instructionContainerStandalone}>
        <Text style={styles.instructionText}>
          We're trying to connect your device...
        </Text>
      </View>
    </View>
  );
};

export default BluetoothConnectionAttemptScreen;
