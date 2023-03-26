import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import useLanguage from "../../../../language/LanguageHook";
import { styles } from "../../../../styles/styles";

interface DetectorGroupTileProps {
  groupName: string;
  detectors?: string[];
  icon: any;
}

const DetectorGroupTile = ({ groupName, icon }: DetectorGroupTileProps) => {
  const LANGUAGE = useLanguage();

  return (
    <TouchableOpacity style={styles.detectorGroupTile}>
      <Image source={icon} style={styles.detectorGroupTileIcon} />
      <View style={styles.detectorGroupTileContent}>
        <View style={styles.detectorGroupTileContentHeader}>
          <Text style={styles.detectorGroupTileContentHeaderText}>
            {groupName}
          </Text>
        </View>
        <Text style={styles.detectorGroupTileContentText}>
          {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.DETECTOR_COUNT : ""}: 3
        </Text>
      </View>
      <Image
        source={require("../../../../assets/icons/arrow-right.png")}
        style={styles.detectorGroupTileArrow}
      />
    </TouchableOpacity>
  );
};

export default DetectorGroupTile;
