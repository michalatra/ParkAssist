import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/styles";
import Navigation from "../../common/Navigation";
import { ColorsEnum } from "../../../models/enums/ColorsEnum";
import Button from "../../common/Button";
import { DetectorLocationTypeEnum } from "../../../models/enums/DetectorLocationTypeEnum";
import { DetectorLocationData } from "../../../models/DetectorLocationData";
import { useToast } from "react-native-toast-notifications";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import {
  getDetectorLocations,
  setDetectorsCount,
  setDetectorsLocations,
} from "../../../services/DetectorsService";

const DetectorsLocationSetupScreen = ({ navigation, route }: any) => {
  const detectorsCount = route.params.detectorsCount;

  const [locations, setLocations] = useState<DetectorLocationData[]>(
    getDetectorLocations()
  );
  const [selectedDetectors, setSelectedDetectors] = useState(0);

  const toast = useToast();

  const onConfirm = () => {
    if (selectedDetectors < detectorsCount)
      return toast.show(
        `You must specify locations of all ${detectorsCount} detectors.`
      );

    setDetectorsCount(selectedDetectors);
    setDetectorsLocations(locations);
    navigation.navigate(ScreenNamesEnum.CONTROLLER);
  };

  const onLocationPressed = (location: DetectorLocationData) => {
    const index = locations.findIndex((l) => l === location);

    if (!location.active) {
      if (selectedDetectors < detectorsCount) {
        locations[index].active = true;
        locations[index].index = selectedDetectors;
        setSelectedDetectors(selectedDetectors + 1);
        setLocations([...locations]);
      }
    } else {
      locations[index].active = false;
      locations
        .filter((l) => l.index && l.index > location.index!)
        .forEach((l) => l.index!--);
      setSelectedDetectors(selectedDetectors - 1);
      setLocations([...locations]);
    }
  };

  return (
    <View style={styles.container}>
      <Navigation title="Setup Detectors" navigation={navigation} />
      <View style={styles.detectorsLocationContainer}>
        <View style={styles.detectorsLocationRowContainer}>
          {locations
            .filter((l) => l.locationType === DetectorLocationTypeEnum.FRONT)
            .map((l) => (
              <TouchableOpacity
                style={[
                  styles.detectorsLocationCell,
                  l.active ? styles.detectorsLocationCellActive : null,
                ]}
                onPress={() => onLocationPressed(l)}
                key={l.locationType + l.location}
              >
                {l.active ? (
                  <Text style={styles.detectorsLocationCellText}>
                    {l.index! + 1}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
        </View>
        <Image
          style={styles.detectorsLocationCarImage}
          source={require("../../../assets/icons/top_shot.png")}
        />
        <View style={styles.detectorsLocationRowContainer}>
          {locations
            .filter((l) => l.locationType === DetectorLocationTypeEnum.BACK)
            .map((l) => (
              <TouchableOpacity
                style={[
                  styles.detectorsLocationCell,
                  l.active ? styles.detectorsLocationCellActive : null,
                ]}
                onPress={() => onLocationPressed(l)}
                key={l.locationType + l.location}
              >
                {l.active ? (
                  <Text style={styles.detectorsLocationCellText}>
                    {l.index! + 1}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <Button
        backgroundColor={ColorsEnum.BUTTON_BLUE}
        title="Confirm"
        action={onConfirm}
      />
    </View>
  );
};

export default DetectorsLocationSetupScreen;
