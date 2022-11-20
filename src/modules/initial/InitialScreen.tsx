import { View, Image, Text } from "react-native";
import Button from "../common/Button";
import { styles } from "../../styles/styles";
import { ScreenNamesEnum } from "../../models/enums/ScreenNamesEnum";
import { ColorsEnum } from "../../models/enums/ColorsEnum";

const InitialScreen = ({ navigation }: any) => {
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
        action={() =>
          navigation.navigate(ScreenNamesEnum.CONNECTION_METHOD_SELECT)
        }
      />
    </View>
  );
};
export default InitialScreen;
