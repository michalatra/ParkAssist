import { Dimensions, StyleSheet } from "react-native";
import { ColorsEnum } from "../models/enums/ColorsEnum";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const instructionFontSize = 18;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorsEnum.BACKGROUND_DARK,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 20,
  },

  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  hidden: {
    opacity: 0,
  },

  logoContainer: {
    marginTop: 0.2 * windowHeight,
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
    color: ColorsEnum.WHITE,
  },

  connectionMethodContainer: {
    width: windowWidth * 0.9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
  },

  connectionMethodContainerGreen: {
    backgroundColor: ColorsEnum.GREEN_LIGHT,
  },

  connectionMethodContainerBlue: {
    backgroundColor: ColorsEnum.BLUE_LIGHT,
  },

  connectionMethodIcon: {
    height: "40%",
    resizeMode: "contain",
  },

  navigationContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "15%",
    padding: 10,
  },
  navigationIcon: {
    width: 20,
    height: "100%",
    resizeMode: "contain",
  },
  navigationTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
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
    backgroundColor: ColorsEnum.YELLOW_LIGHT,
  },

  outerCircleGreen: {
    backgroundColor: ColorsEnum.GREEN_LIGHT,
  },

  outerCircleBlue: {
    backgroundColor: ColorsEnum.BLUE_LIGHT,
  },

  outerCirclePink: {
    backgroundColor: ColorsEnum.PINK_LIGHT,
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
    backgroundColor: ColorsEnum.YELLOW_DARK,
  },

  innerCircleGreen: {
    backgroundColor: ColorsEnum.GREEN_DARK,
  },

  innerCircleBlue: {
    backgroundColor: ColorsEnum.BLUE_DARK,
  },

  innerCirclePink: {
    backgroundColor: ColorsEnum.PINK_DARK,
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
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: instructionFontSize,
  },

  bluetoothDeviceList: {
    flex: 1,
  },

  bluetoothDeviceListContent: {
    flex: 1,
  },

  deviceInfoContainer: {
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 20,
    padding: 10,
    width: windowWidth * 0.95,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  deviceInfoTitle: {
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },

  deviceInfoItemsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
  },

  deviceInfoItem: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  deviceInfoItemIcon: {
    width: 20,
    height: 20,
    margin: 8,
    resizeMode: "contain",
  },

  deviceInfoItemText: {
    color: ColorsEnum.WHITE,
    fontSize: 13,
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

  detectorsQuantityContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  detectorsQuantityTitle: {
    textAlign: "center",
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: instructionFontSize,
  },

  detectorsQuantityInput: {
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    borderRadius: 20,
    borderColor: ColorsEnum.BORDER,
    borderWidth: 2,
    color: ColorsEnum.WHITE,
    padding: 10,
    fontSize: 16,
    width: windowWidth * 0.8,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },

  detectorsSocketContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },

  detectorsSocketTitle: {
    textAlign: "center",
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: instructionFontSize,
  },

  detectorsSocketInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  detectorsSocketInput: {
    backgroundColor: ColorsEnum.BORDER,
    borderRadius: 20,
    borderColor: ColorsEnum.BACKGROUND_DARK,
    borderWidth: 6,
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    margin: 5,
    color: ColorsEnum.WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },

  detectorsSocketInputError: {
    backgroundColor: ColorsEnum.RED_REJECT,
  },

  detectorsLocationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  detectorsLocationCarImage: {
    height: "35%",
    resizeMode: "contain",
    marginVertical: 25,
  },

  detectorsLocationRowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  detectorsLocationCell: {
    backgroundColor: ColorsEnum.BORDER,
    borderRadius: 20,
    borderColor: ColorsEnum.BACKGROUND_LIGHT,
    borderWidth: 6,
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  detectorsLocationCellActive: {
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderColor: ColorsEnum.BORDER,
  },

  detectorsLocationCellText: {
    color: ColorsEnum.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },

  measurementContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  measurementCarImage: {
    height: "35%",
    resizeMode: "contain",
    marginVertical: 25,
  },

  measurementRowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "80%",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    borderRadius: 20,
    padding: 15,
  },

  modalIconContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 60,
  },

  modalIcon: {
    height: "100%",
    resizeMode: "contain",
  },

  modalTitle: {
    color: ColorsEnum.WHITE,
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },

  modalDescription: {
    color: ColorsEnum.WHITE,
    fontSize: 18,
  },

  modalButtonsContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalButton: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  modalButtonAccept: {
    backgroundColor: ColorsEnum.GREEN_ACCEPT,
  },

  modalButtonReject: {
    backgroundColor: ColorsEnum.RED_REJECT,
  },

  modalButtonDefault: {
    backgroundColor: ColorsEnum.BUTTON_BLUE,
  },

  modalButtonText: {
    color: ColorsEnum.WHITE,
    fontSize: 16,
  },
});
