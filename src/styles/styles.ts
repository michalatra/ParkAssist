import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const colors = {
  white: "#FFFFFF",
  backgroundDark: "#121212",
  backgroundLight: "#2E2E2E",
  yellowLight: "#FFD149",
  yellowDark: "#FFA000",
  pinkLight: "#FA5788",
  pinkDark: "#C2185B",
  greenLight: "#629749",
  greenDark: "#33691E",
  blueLight: "#228CDB",
  blueDark: "#035C9E",
};

const instructionFontSize = 20;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 20,
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
    color: colors.white,
  },

  actionContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    flex: 0.6,
    alignItems: "center",
  },

  circleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },

  outerCircle: {
    borderRadius: windowWidth,
    width: windowWidth / 1.8,
    height: windowWidth / 1.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  outerCircleYellow: {
    backgroundColor: colors.yellowLight,
  },

  outerCircleGreen: {
    backgroundColor: colors.greenLight,
  },

  outerCircleBlue: {
    backgroundColor: colors.blueLight,
  },

  outerCirclePink: {
    backgroundColor: colors.pinkLight,
  },

  innerCircle: {
    borderRadius: windowWidth,
    width: windowWidth / 2.2,
    height: windowWidth / 2.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircleYellow: {
    backgroundColor: colors.yellowDark,
  },

  innerCircleGreen: {
    backgroundColor: colors.greenDark,
  },

  innerCircleBlue: {
    backgroundColor: colors.blueDark,
  },

  innerCirclePink: {
    backgroundColor: colors.pinkDark,
  },

  circleIcon: {
    width: "60%",
    resizeMode: "contain",
  },

  instructionContainer: {
    marginTop: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  instructionText: {
    textAlign: "center",
    lineHeight: 45,
    width: "90%",
    color: colors.white,
    fontWeight: "bold",
    fontSize: instructionFontSize,
  },

  deviceInfoContainer: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    padding: 10,
    width: windowWidth * 0.95,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  deviceInfoTitle: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },

  deviceInfoItem: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  deviceInfoItemIcon: {
    width: 25,
    height: 25,
    margin: 8,
    resizeMode: "contain",
  },

  deviceInfoItemText: {
    color: colors.white,
    fontSize: 16,
    margin: 5,
  },

  deviceTile: {
    width: windowWidth * 0.95,
    backgroundColor: "#2E2E2E",
    padding: 15,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
  },

  deviceTileIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  deviceTileName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "#FFF",
  },
});
