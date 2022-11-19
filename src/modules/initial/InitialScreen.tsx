import { View, Image, Text } from "react-native";
import Button from "../common/Button";
import { styles } from "../../styles/styles";

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
        backgroundColor="#1565C0"
        title="Setup Detectors"
        action={() => navigation.navigate("DeviceSearch")}
      />
    </View>
  );
};
export default InitialScreen;
