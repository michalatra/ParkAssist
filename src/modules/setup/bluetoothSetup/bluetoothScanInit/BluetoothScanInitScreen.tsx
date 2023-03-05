import { View, Text, Image } from "react-native";
import { styles } from "../../../../styles/styles";
import { ScreenNamesEnum } from "../../../../models/enums/ScreenNamesEnum";
import NavBar from "../../../common/NavBar";
import WavyBackground from "../../../common/WavyBackground";
import { ColorsEnum } from "../../../../models/enums/ColorsEnum";
import useLanguage from "../../../../language/LanguageHook";
import ActionButton from "../../../common/ActionButton";

const BluetoothScanInitScreen = ({ navigation, route }: any) => {
  const LANGUAGE = useLanguage();

  const returnScreen: string = route.params?.returnScreen
    ? route.params.returnScreen
    : ScreenNamesEnum.CONTROLLER;

  const scanDevices = () => {
    navigation.navigate(ScreenNamesEnum.BLUETOOTH_SCAN_RESULTS, {
      returnScreen,
    });
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.BACKGROUND_MEDIUM} />
      <NavBar navigation={navigation} showSettings={false} showHelp={true} />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE ? LANGUAGE.BLUETOOTH_SETUP.SCAN_INIT.INSTRUCTION : ""}
          </Text>
          <Text style={styles.subInstructionText}>
            {LANGUAGE ? LANGUAGE.BLUETOOTH_SETUP.SCAN_INIT.SUB_INSTRUCTION : ""}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Image
            style={styles.contentImage}
            source={require("../../../../assets/icons/connect.png")}
          />
        </View>
        <ActionButton
          title={LANGUAGE ? LANGUAGE.BLUETOOTH_SETUP.SCAN_INIT.BEGIN_SCAN : ""}
          action={scanDevices}
        />
      </View>
    </View>
  );
};

export default BluetoothScanInitScreen;
