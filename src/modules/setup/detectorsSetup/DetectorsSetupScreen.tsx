import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import WavyBackground from "../../common/WavyBackground";
import { ColorsEnum } from "../../../models/enums/ColorsEnum";
import NavBar from "../../common/NavBar";
import useLanguage from "../../../language/LanguageHook";
import ActionButton from "../../common/ActionButton";
import DetectorGroupTile from "./components/DetectorGroupTile";

const DetectorsQuantitySetupScreen = ({ navigation }: any) => {
  const LANGUAGE = useLanguage();

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.GREEN_DARK} />
      <NavBar navigation={navigation} showSettings={false} showHelp={true} />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.INSTRUCTION : ""}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.centeredContainer}
          style={styles.detectorGroup}
        >
          <DetectorGroupTile
            groupName={
              LANGUAGE ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE.ULTRA_SONIC : ""
            }
            icon={require("../../../assets/icons/sound.png")}
          />
          <DetectorGroupTile
            groupName={
              LANGUAGE ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE.INFRARED : ""
            }
            icon={require("../../../assets/icons/infrared.png")}
          />
          <DetectorGroupTile
            groupName={
              LANGUAGE ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE.LIDAR : ""
            }
            icon={require("../../../assets/icons/lidar.png")}
          />
        </ScrollView>
        <ActionButton
          title={LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SAVE : ""}
          action={() => {}}
        />
      </View>
    </View>
  );
};

export default DetectorsQuantitySetupScreen;
