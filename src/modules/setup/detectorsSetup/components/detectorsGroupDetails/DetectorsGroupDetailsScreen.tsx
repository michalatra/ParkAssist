import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../../../../styles/styles";
import WavyBackground from "../../../../common/WavyBackground";
import { ColorsEnum } from "../../../../../models/enums/ColorsEnum";
import NavBar from "../../../../common/NavBar";
import { DetectorData } from "../../../../../models/DetectorData";
import useLanguage from "../../../../../language/LanguageHook";
import { DetectorTypeEnum } from "../../../../../models/enums/DetectorTypeEnum";
import ActionButton from "../../../../common/ActionButton";
import DetectorsList from "./components/DetectorsList";
import {
  getDetectors,
  updateDetectors,
} from "../../../../../services/DetectorsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenNamesEnum } from "../../../../../models/enums/ScreenNamesEnum";
import { filter, first, map, tap } from "rxjs";

const DetectorsGroupDetailsScreen = ({ navigation, route }: any) => {
  const LANGUAGE = useLanguage();
  const [loading, setLoading] = useState<boolean>(false);
  const [detectorType, setDetectorType] = useState<DetectorTypeEnum>(
    route.params.detectorType
  );
  const [detectors, setDetectors] = useState<DetectorData[]>([]);

  useEffect(() => {
    setLoading(true);

    getDetectors(AsyncStorage)
      .pipe(
        first(),
        map((detectors) =>
          detectors.filter((detector) => detector.type === detectorType)
        ),
        tap((_) => setLoading(false))
      )
      .subscribe((detectors) => setDetectors(detectors));
  }, []);

  useEffect(() => {
    const subscription = navigation.addListener("focus", () => {
      getDetectors(AsyncStorage)
        .pipe(
          first(),
          map((detectors) =>
            detectors.filter((detector) => detector.type === detectorType)
          ),
          tap((_) => setLoading(false))
        )
        .subscribe((detectors) => setDetectors(detectors));
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAddNewDetector = (): void => {
    navigation.navigate(ScreenNamesEnum.ADD_EDIT_DETECTOR_SCREEN, {
      detectorData: null,
      detectorType: detectorType,
    });
  };

  const handleEditDetector = (detector: DetectorData): void => {
    navigation.navigate(ScreenNamesEnum.ADD_EDIT_DETECTOR_SCREEN, {
      detectorData: detector,
      detectorType: detectorType,
    });
  };

  const handleRemoveDetector = (detector: DetectorData): void => {
    const updatedDetectors = detectors.filter((d) => d.id !== detector.id);
    updateDetectors(updatedDetectors, AsyncStorage)
      .pipe(first())
      .subscribe({
        next: () => setDetectors(updatedDetectors),
        error: (error) => console.log(error),
      });
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.GREEN_DARK} />
      <NavBar navigation={navigation} showSettings={true} showHelp={true} />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE
              ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE[detectorType]
              : ""}
          </Text>
        </View>
        <DetectorsList
          detectors={detectors}
          onEdit={handleEditDetector}
          onRemove={handleRemoveDetector}
        />
        <ActionButton
          title={LANGUAGE ? LANGUAGE?.DETECTORS_SETUP.ADD_NEW_DETECTOR : ""}
          action={handleAddNewDetector}
        />
      </View>
    </View>
  );
};

export default DetectorsGroupDetailsScreen;
