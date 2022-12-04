import { Image, Text, View } from "react-native";
import Button from "../common/Button";
import { styles } from "../../styles/styles";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { ColorsEnum } from "../../models/enums/ColorsEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeysEnum } from "../../models/enums/StorageKeysEnum";
import { saveValue } from "../../services/StorageService";
import { take } from "rxjs";

const InitialScreen = ({ navigation }: any) => {
  const onSetup = () => {
    saveValue(AsyncStorage, StorageKeysEnum.APP_INITIALIZED, true)
      .pipe(take(1))
      .subscribe((_) =>
        navigation.navigate(ScreenNamesEnum.CONNECTION_METHOD_SELECT)
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/icons/lane-assistance-system.png")}
        />
        <Text style={styles.title}>Park Assist</Text>
      </View>
      <Button
        backgroundColor={ColorsEnum.BUTTON_BLUE}
        title="Setup Detectors"
        action={onSetup}
      />
    </View>
  );
};
export default InitialScreen;
