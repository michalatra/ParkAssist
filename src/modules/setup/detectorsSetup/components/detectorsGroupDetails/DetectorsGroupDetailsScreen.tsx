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
import { filter, take, tap } from "rxjs";
import { DetectorStorageData } from "../../../../../models/DetectorStorageData";

const DetectorsGroupDetailsScreen = ({ navigation, route }: any) => {
  const LANGUAGE = useLanguage();
  const [loading, setLoading] = useState<boolean>(false);
  const [detectorType, setDetectorType] = useState<DetectorTypeEnum>(
    route.params.detectorType
  );
  const [detectors, setDetectors] = useState<DetectorStorageData>({
    [DetectorTypeEnum.ULTRA_SONIC]: [],
    [DetectorTypeEnum.SINGLE_POINT_LIDAR]: [],
    [DetectorTypeEnum.MULTI_POINT_LIDAR]: [],
  });

  useEffect(() => {
    setupDetectors();
  }, []);

  useEffect(() => {
    const subscription = navigation.addListener("focus", () =>
      setupDetectors()
    );
  }, []);

  const setupDetectors = () => {
    setLoading(true);

    getDetectors(AsyncStorage)
      .pipe(
        take(1),
        filter(Boolean),
        tap((_) => setLoading(false))
      )
      .subscribe((detectors) => setDetectors(detectors));
  };

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
    const updatedDetectors: DetectorStorageData = { ...detectors };
    updatedDetectors[detector.type] = updatedDetectors[detector.type].filter(
      (d) => d.id !== detector.id
    );

    updateDetectors(updatedDetectors, AsyncStorage)
      .pipe(take(1))
      .subscribe({
        next: () => setDetectors(updatedDetectors),
        error: (error) => console.log(error),
      });
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.GREEN_DARK} />
      <NavBar
        navigation={navigation}
        showLanguage={false}
        showSettings={true}
        showHelp={true}
      />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE
              ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE[detectorType]
              : ""}
          </Text>
        </View>
        <DetectorsList
          detectors={detectors[detectorType]}
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
