import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../../styles/styles";
import WavyBackground from "../../common/WavyBackground";
import { ColorsEnum } from "../../../models/enums/ColorsEnum";
import NavBar from "../../common/NavBar";
import useLanguage from "../../../language/LanguageHook";
import ActionButton from "../../common/ActionButton";
import DetectorGroupTile from "./components/DetectorGroupTile";
import { DetectorTypeEnum } from "../../../models/enums/DetectorTypeEnum";
import { DetectorData } from "../../../models/DetectorData";
import { ScreenNamesEnum } from "../../../models/enums/ScreenNamesEnum";
import { getDetectors } from "../../../services/DetectorsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { filter, first, take } from "rxjs";
import { setupWiredDetectors } from "../../../services/BluetoothService";

const DetectorsSetupScreen = ({ navigation, route }: any) => {
  const returnScreen: string = route.params?.returnScreen
    ? route.params.returnScreen
    : ScreenNamesEnum.CONTROLLER;

  const [loading, setLoading] = useState<boolean>(false);
  const [ultrasonicDetectors, setUltrasonicDetectors] = useState<
    DetectorData[]
  >([]);
  const [singlePointLidarDetectors, setSinglePointLidarDetectors] = useState<
    DetectorData[]
  >([]);
  const [multiPointLidarDetectors, setMultiPointLidarDetectors] = useState<
    DetectorData[]
  >([]);
  const LANGUAGE = useLanguage();

  useEffect(() => {
    setupDetectors();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => setupDetectors());
  }, []);

  const setupDetectors = () => {
    setLoading(true);

    getDetectors(AsyncStorage)
      .pipe(first(), filter(Boolean))
      .subscribe({
        next: (detectors) => {
          setUltrasonicDetectors(detectors[DetectorTypeEnum.ULTRA_SONIC]);
          setSinglePointLidarDetectors(
            detectors[DetectorTypeEnum.SINGLE_POINT_LIDAR]
          );
          setMultiPointLidarDetectors(
            detectors[DetectorTypeEnum.MULTI_POINT_LIDAR]
          );
          setLoading(false);
        },
        error: (error) => {
          console.log(error);
          setLoading(false);
        },
      });
  };

  const handleGroupSelect = (
    detectorType: DetectorTypeEnum,
    detectors: DetectorData[]
  ): void => {
    navigation.navigate(ScreenNamesEnum.DETECTORS_GROUP_DETAILS, {
      detectorType: detectorType,
    });
  };

  const handleSave = (): void => {
    setupWiredDetectors()
      .pipe(take(1))
      .subscribe(() => navigation.navigate(returnScreen));
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.GREEN_DARK} />
      <NavBar
        navigation={navigation}
        showLanguage={false}
        showSettings={false}
        showHelp={true}
      />
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
            detectorsType={DetectorTypeEnum.ULTRA_SONIC}
            detectorsQuantity={ultrasonicDetectors.length}
            onSelect={() =>
              handleGroupSelect(
                DetectorTypeEnum.ULTRA_SONIC,
                ultrasonicDetectors
              )
            }
          />
          <DetectorGroupTile
            groupName={
              LANGUAGE
                ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE.SINGLE_POINT_LIDAR
                : ""
            }
            detectorsType={DetectorTypeEnum.SINGLE_POINT_LIDAR}
            detectorsQuantity={singlePointLidarDetectors.length}
            onSelect={() =>
              handleGroupSelect(
                DetectorTypeEnum.SINGLE_POINT_LIDAR,
                singlePointLidarDetectors
              )
            }
          />
          <DetectorGroupTile
            groupName={
              LANGUAGE
                ? LANGUAGE.DETECTORS_SETUP.DETECTOR_TYPE.MULTI_POINT_LIDAR
                : ""
            }
            detectorsType={DetectorTypeEnum.MULTI_POINT_LIDAR}
            detectorsQuantity={multiPointLidarDetectors.length}
            onSelect={() =>
              handleGroupSelect(
                DetectorTypeEnum.MULTI_POINT_LIDAR,
                multiPointLidarDetectors
              )
            }
          />
        </ScrollView>
        <ActionButton
          title={LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SAVE : ""}
          action={handleSave}
        />
      </View>
    </View>
  );
};

export default DetectorsSetupScreen;
