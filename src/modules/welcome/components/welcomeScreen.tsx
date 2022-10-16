import { StyleSheet, View, Image, Text } from "react-native";
import Button from "../../common/components/button";

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icons/lane-assistance-system.png")}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 80,
  },
  logoContainer: {
    marginTop: 80,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "70%",
    flex: 1,
  },
  logo: {
    height: "30%",
    resizeMode: "contain",
  },
  title: {
    marginTop: 30,
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default WelcomeScreen;
