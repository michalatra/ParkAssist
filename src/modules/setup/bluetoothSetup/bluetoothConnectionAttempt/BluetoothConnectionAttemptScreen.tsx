import { View, Text, Image } from "react-native";
import { styles } from "../../../../styles/styles";
import { useEffect } from "react";
import {
  connectDeviceById,
  connectedDevice$,
  connectingFinishedSuccessfully$,
} from "../../../../services/BluetoothService";
import { catchError, empty, first, switchMap } from "rxjs";
import { saveValue } from "../../../../services/StorageService";
import { StorageKeysEnum } from "../../../../models/enums/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenNamesEnum } from "../../../../models/enums/ScreenNamesEnum";
import NavBar from "../../../common/NavBar";
import useLanguage from "../../../../language/LanguageHook";
import WavyBackground from "../../../common/WavyBackground";
import { ColorsEnum } from "../../../../models/enums/ColorsEnum";
import { showToast } from "../../../../services/ToastService";
import { NotificationEnum } from "../../../../models/enums/NotificationEnum";
import { ToastType } from "../../../../models/enums/ToastType";
import { ErrorEnum } from "../../../../models/enums/ErrorEnum";

const BluetoothConnectionAttemptScreen = ({ navigation, route }: any) => {
  const deviceId: string = route.params.deviceId;
  const returnScreen: string = route.params?.returnScreen
    ? route.params.returnScreen
    : ScreenNamesEnum.CONTROLLER;

  const LANGUAGE = useLanguage();

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
        showToast(NotificationEnum.CONNECTED_SUCCESSFULLY, ToastType.SUCCESS);
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
          showToast(ErrorEnum.CONNECTING_FAILED, ToastType.DANGER);
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
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.BACKGROUND_MEDIUM} />
      <NavBar
        navigation={navigation}
        showSettings={false}
        showHelp={false}
        showLanguage={false}
      />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE
              ? LANGUAGE.BLUETOOTH_SETUP.CONNECTION_ATTEMPT.INSTRUCTION
              : ""}
          </Text>
        </View>
        <View style={styles.contentContainerCenteredHorizontally}>
          <Image
            style={styles.contentImage}
            source={require("../../../../assets/icons/connectionAttempt.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default BluetoothConnectionAttemptScreen;
