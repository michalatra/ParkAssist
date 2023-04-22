import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import useLanguage from "../../../../language/LanguageHook";
import { styles } from "../../../../styles/styles";
import { DetectorTypeEnum } from "../../../../models/enums/DetectorTypeEnum";

interface DetectorGroupTileProps {
  groupName: string;
  detectorsType: DetectorTypeEnum;
  detectorsQuantity: number;
  onSelect: () => void;
}

const getIcon = (detectorsType: DetectorTypeEnum): any => {
  switch (detectorsType) {
    case DetectorTypeEnum.ULTRA_SONIC:
      return require("../../../../assets/icons/sound.png");
    case DetectorTypeEnum.SINGLE_POINT_LIDAR:
      return require("../../../../assets/icons/infrared.png");
    case DetectorTypeEnum.MULTI_POINT_LIDAR:
      return require("../../../../assets/icons/lidar.png");
  }
};

const DetectorGroupTile = ({
  groupName,
  detectorsType,
  detectorsQuantity,
  onSelect,
}: DetectorGroupTileProps) => {
  const LANGUAGE = useLanguage();

  return (
    <TouchableOpacity style={styles.detectorGroupTile} onPress={onSelect}>
      <Image
        source={getIcon(detectorsType)}
        style={styles.detectorGroupTileIcon}
      />
      <View style={styles.detectorGroupTileContent}>
        <View style={styles.detectorGroupTileContentHeader}>
          <Text style={styles.detectorGroupTileContentHeaderText}>
            {groupName}
          </Text>
        </View>
        <Text style={styles.detectorGroupTileContentText}>
          {LANGUAGE
            ? `${LANGUAGE.DETECTORS_SETUP.DETECTOR_COUNT}: ${detectorsQuantity}`
            : null}
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
