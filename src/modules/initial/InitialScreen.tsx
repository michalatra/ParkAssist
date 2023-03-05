import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { saveValue } from "../../services/StorageService";
import { take } from "rxjs";
import ActionButton from "../common/ActionButton";
import useLanguage from "../../language/LanguageHook";
import NavBar from "../common/NavBar";
import WavyBackground from "../common/WavyBackground";

const InitialScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();

  const onSetup = () => {
    saveValue(AsyncStorage, StorageKeysEnum.APP_INITIALIZED, true)
      .pipe(take(1))
      .subscribe((_) =>
        navigation.navigate(ScreenNamesEnum.CONNECTION_METHOD_SELECT)
      );
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.YELLOW_DARK} />
      <NavBar navigation={navigation} showSettings={false} showHelp={true} />
      <View style={styles.logoContainer}>
        <Text style={styles.title}>
          {LANGUAGE ? LANGUAGE.INITIAL.APP_TITLE : ""}
        </Text>
        <Text style={styles.slogan}>
          {LANGUAGE ? LANGUAGE.INITIAL.APP_SLOGAN : ""}
        </Text>
      </View>
      <ActionButton
        title={LANGUAGE ? LANGUAGE.INITIAL.SETUP_BUTTON : ""}
        action={onSetup}
      />
    </View>
  );
};
export default InitialScreen;
