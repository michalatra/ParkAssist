import { Dimensions, StyleSheet } from "react-native";
import { ColorsEnum } from "../models/enums/ColorsEnum";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

const instructionFontSize = 13;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorsEnum.BACKGROUND_DARK,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flex: 1,
    paddingBottom: 20,
  },

  initContainer: {
    backgroundColor: ColorsEnum.BACKGROUND_DARK,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    flex: 1,
  },

  layoutContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    flex: 1,
  },

  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },

  contentContainerCenteredHorizontally: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },

  fullScreenScrollView: {
    display: "flex",
    flex: 1,
    width: "100%",
    padding: 10,
  },

  contentImage: {
    width: "70%",
    resizeMode: "contain",
  },

  centeredContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },

  hidden: {
    opacity: 0,
  },

  w100: {
    width: "100%",
  },

  logoContainer: {
    marginTop: 0.2 * windowHeight,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    flex: 1,
  },

  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: ColorsEnum.WHITE,
    marginBottom: 10,
  },

  slogan: {
    fontSize: 20,
    color: ColorsEnum.LIGHT_GRAY,
  },

  wavesContainer: {
    position: "absolute",
    width: windowWidth,
    height: windowHeight,
  },

  waves: {
    position: "absolute",
    top: windowHeight * 0.8 - 320,
  },

  wavesFooter: {
    position: "absolute",
    height: windowHeight * 0.2,
    width: windowWidth,
    top: windowHeight * 0.8,
  },

  buttonContainer: {
    display: "flex",
    height: 120,
    width: windowWidth,
    padding: 30,
    marginBottom: 30,
    alignItems: "stretch",
    justifyContent: "center",
  },

  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: ColorsEnum.WHITE,
    borderRadius: 20,
    padding: 15,
    flex: 1,
    elevation: 5,
  },

  buttonDisabled: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    borderColor: ColorsEnum.WHITE,
    borderWidth: 2,
    padding: 15,
    flex: 1,
  },

  buttonText: {
    color: ColorsEnum.BLACK,
    fontWeight: "bold",
    fontSize: 20,
  },

  buttonTextDisabled: {
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },

  buttonIcon: {
    width: 20,
    resizeMode: "contain",
  },

  buttonIconDisabled: {
    width: 20,
    tintColor: ColorsEnum.WHITE,
    resizeMode: "contain",
  },

  connectionMethodsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 0.8,
  },

  connectionMethodContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    margin: 10,
    elevation: 10,
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    padding: 20,
  },

  connectionMethodContainerActive: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    margin: 10,
    elevation: 10,
    backgroundColor: ColorsEnum.WHITE,
    padding: 20,
  },

  connectionMethodIcon: {
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },

  connectionMethodIconActive: {
    height: 80,
    resizeMode: "contain",
    tintColor: ColorsEnum.BACKGROUND_LIGHT,
    marginBottom: 20,
  },

  connectionMethodText: {
    fontSize: 24,
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
  },

  connectionMethodTextActive: {
    fontSize: 24,
    color: ColorsEnum.BACKGROUND_LIGHT,
    fontWeight: "bold",
  },

  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: windowWidth,
  },

  navLogoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    padding: 10,
    borderRadius: 10,
  },

  navLogo: {
    fontSize: 14,
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
  },

  navActionsContainer: {
    display: "flex",
    flexDirection: "row",
  },

  navActionContainer: {
    borderRadius: 10,
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  navActionContainerLeft: {
    marginRight: 10,
  },

  navActionContainerRight: {
    marginLeft: 10,
  },

  navIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  navigationContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: 50,
    padding: 10,
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    elevation: 20,
    marginVertical: 15,
    borderRadius: 20,
  },

  navigationIcon: {
    width: 15,
    height: "100%",
    resizeMode: "contain",
  },

  navigationTitle: {
    fontSize: 16,
    color: ColorsEnum.WHITE,
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
    width: "90%",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    elevation: 20,
    padding: 10,
    borderRadius: 20,
  },

  outerCircle: {
    borderRadius: windowWidth,
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    marginVertical: 10,
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    padding: 20,
  },

  instructionContainerStandalone: {
    marginVertical: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    borderRadius: 20,
    elevation: 10,
    paddingVertical: 10,
  },

  instructionText: {
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: 46,
    marginBottom: 20,
  },

  subInstructionText: {
    fontSize: 20,
    color: ColorsEnum.LIGHT_GRAY,
  },

  bluetoothDeviceList: {
    flex: 1,
  },

  bluetoothDeviceListContent: {
    flex: 1,
    alignItems: "stretch",
    width: "100%",
    paddingHorizontal: 20,
  },

  bluetoothDeviceListContentRefresh: {
    marginTop: 80,
  },

  deviceInfoContainer: {
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    borderRadius: 20,
    padding: 10,
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    elevation: 5,
  },

  deviceInfoTitleContainer: {
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  deviceInfoTitle: {
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: 18,
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

  deviceInfoRefreshIcon: {
    width: 16,
    height: 16,
    margin: 8,
    resizeMode: "contain",
    opacity: 0.8,
  },

  deviceInfoItemText: {
    color: ColorsEnum.WHITE,
    fontSize: 13,
    margin: 5,
  },

  deviceTile: {
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    padding: 15,
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
    elevation: 20,
  },

  deviceTileActive: {
    backgroundColor: ColorsEnum.WHITE,
    padding: 15,
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
    elevation: 20,
  },

  deviceTileIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  deviceTileIconActive: {
    width: 20,
    height: 20,
    tintColor: ColorsEnum.BACKGROUND_MEDIUM,
    resizeMode: "contain",
  },

  deviceTileName: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: ColorsEnum.WHITE,
  },

  deviceTileNameActive: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: ColorsEnum.BACKGROUND_MEDIUM,
  },

  detectorGroup: {
    width: "100%",
  },

  detectorGroupTile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    elevation: 5,
    marginVertical: 10,
  },

  detectorGroupTileIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  detectorGroupTileContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  detectorGroupTileContentHeader: {
    padding: 10,
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 10,
  },

  detectorGroupTileContentHeaderText: {
    color: ColorsEnum.WHITE,
    fontWeight: "bold",
    fontSize: 16,
  },

  detectorGroupTileContentText: {
    color: ColorsEnum.LIGHT_GRAY,
    fontSize: 16,
    marginTop: 10,
  },

  detectorGroupTileArrow: {
    width: 30,
    tintColor: ColorsEnum.WHITE,
    resizeMode: "contain",
  },

  emptyListInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    elevation: 5,
  },

  emptyListInfoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorsEnum.WHITE,
  },

  detectorListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    elevation: 5,
    marginVertical: 10,
  },

  detectorListItemContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  detectorListItemIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  detectorListItemText: {
    color: ColorsEnum.WHITE,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
  },

  detectorListItemActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  detectorListItemAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },

  detectorListItemActionIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  detectorAddSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    marginVertical: 10,
    elevation: 5,
  },

  detectorAddSectionTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 10,
    marginBottom: 10,
  },

  detectorAddSectionTitle: {
    color: ColorsEnum.WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },

  detectorAddSectionInput: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  detectorAddSectionInputText: {
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: ColorsEnum.WHITE,
    fontSize: 18,
    elevation: 5,
  },

  detectorAddSectionOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    marginVertical: 10,
  },

  detectorAddSectionOption: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
  },

  detectorAddSectionOptionActive: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsEnum.WHITE,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
  },

  detectorAddSectionExpandedOption: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
  },

  detectorAddSectionExpandedOptionActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorsEnum.WHITE,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
  },

  detectorAddSectionExpandedOptionIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },

  detectorAddSectionOptionText: {
    color: ColorsEnum.WHITE,
    fontSize: 16,
  },

  detectorAddSectionOptionTextActive: {
    color: ColorsEnum.BLACK,
    fontSize: 16,
    fontWeight: "bold",
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
    width: "100%",
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

  settingsSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: ColorsEnum.BACKGROUND_MEDIUM,
    width: "90%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    elevation: 20,
    shadowColor: ColorsEnum.CORAL,
  },

  settingsSectionListContainer: {
    width: "100%",
  },

  settingsSectionList: {
    alignItems: "center",
    width: "100%",
  },

  settingsSectionTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingsSectionTitle: {
    color: ColorsEnum.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  settingsSectionTile: {
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    padding: 15,
    marginVertical: 3,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },

  settingsSectionTileText: {
    color: ColorsEnum.WHITE,
    fontSize: 16,
  },

  settingsSectionTileIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: ColorsEnum.WHITE,
  },

  dropdown: {
    position: "relative",
  },

  dropdownContent: {
    position: "absolute",
    top: 40,
    right: -10,
    backgroundColor: ColorsEnum.BACKGROUND_LIGHT,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },

  dropdownItemContainer: {
    paddingVertical: 10,
  },

  dropdownItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownItemIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
    resizeMode: "contain",
  },

  dropdownItemLabel: {
    color: ColorsEnum.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },

  measurementIndicatorContainer: {
    width: windowWidth,
    height: windowWidth,
    position: "relative",
  },

  measurementIndicator: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    position: "absolute",
    top: 0,
    left: windowWidth * 0.1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
