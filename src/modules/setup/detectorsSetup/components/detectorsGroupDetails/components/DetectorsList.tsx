import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../../../styles/styles";
import { DetectorData } from "../../../../../../models/DetectorData";

interface DetectorsListProps {
  detectors: DetectorData[];
  onEdit: (detector: DetectorData) => void;
  onRemove: (detector: DetectorData) => void;
}

const DetectorsList = ({ detectors, onEdit, onRemove }: DetectorsListProps) => {
  return (
    <ScrollView
      contentContainerStyle={styles.centeredContainer}
      style={styles.detectorGroup}
    >
      {detectors.map((detector, index) => (
        <View key={index} style={styles.detectorListItem}>
          <View style={styles.detectorListItemContent}>
            <Image
              style={styles.detectorListItemIcon}
              source={require("../../../../../../assets/icons/detector.png")}
            />
            <Text style={styles.detectorListItemText}>{detector.name}</Text>
          </View>
          <View style={styles.detectorListItemActions}>
            <TouchableOpacity
              style={styles.detectorListItemAction}
              onPress={() => onEdit(detector)}
            >
              <Image
                style={styles.detectorListItemActionIcon}
                source={require("../../../../../../assets/icons/edit.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detectorListItemAction}
              onPress={() => onRemove(detector)}
            >
              <Image
                style={styles.detectorListItemActionIcon}
                source={require("../../../../../../assets/icons/trash.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default DetectorsList;
