import React from "react";
import { View } from "react-native";
import { styles } from "../../../../../styles/styles";
import WavyBackground from "../../../../common/WavyBackground";
import { ColorsEnum } from "../../../../../models/enums/ColorsEnum";
import NavBar from "../../../../common/NavBar";
import { DetectorData } from "../../../../../models/DetectorData";

interface DetectorsGroupDetailsProps {
  navigation: any;
  detectors: DetectorData[];
}

const DetectorsGroupDetails = ({
  navigation,
  detectors,
}: DetectorsGroupDetailsProps) => {
  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.BACKGROUND_MEDIUM} />
      <NavBar navigation={navigation} showSettings={true} showHelp={true} />
    </View>
  );
};

export default DetectorsGroupDetails;
