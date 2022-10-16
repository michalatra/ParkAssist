import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Navigation from "../../common/components/navigation";

const DeviceSearchScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Navigation title="Find Detectors Nearby" navigation={navigation} />
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              style={styles.btIcon}
              source={require("../../../assets/icons/bluetooth.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingTop: 0,
    paddingBottom: 80,
  },
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  outerCircle: {
    backgroundColor: "#629749",
    borderRadius: windowWidth,
    width: windowWidth / 1.5,
    height: windowWidth / 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#33691E",
    borderRadius: windowWidth,
    width: windowWidth / 1.8,
    height: windowWidth / 1.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btIcon: {
    width: "60%",
    resizeMode: "contain",
  },
  instructionText: {},
});

export default DeviceSearchScreen;
