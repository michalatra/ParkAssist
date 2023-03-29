import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DetectorData } from "../../../../../models/DetectorData";
import { DetectorTypeEnum } from "../../../../../models/enums/DetectorTypeEnum";
import { DetectorLocationTypeEnum } from "../../../../../models/enums/DetectorLocationTypeEnum";
import { styles } from "../../../../../styles/styles";
import WavyBackground from "../../../../common/WavyBackground";
import { ColorsEnum } from "../../../../../models/enums/ColorsEnum";
import NavBar from "../../../../common/NavBar";
import {
  getDetectors,
  updateDetectors,
} from "../../../../../services/DetectorsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { first, tap } from "rxjs";
import ActionButton from "../../../../common/ActionButton";
import useLanguage from "../../../../../language/LanguageHook";
import { DetectorLocationEnum } from "../../../../../models/enums/DetectorLocationEnum";
import { ScreenNamesEnum } from "../../../../../models/enums/ScreenNamesEnum";

const AddEditDetectorScreen = ({ navigation, route }: any) => {
  const LANGUAGE = useLanguage();

  const [detectorData] = React.useState<DetectorData | null>(
    route.params.detectorData
  );
  const [baseDetectorType] = React.useState<DetectorTypeEnum>(
    route.params.detectorType
  );
  const [name, setName] = React.useState<string>("");
  const [type, setType] = React.useState<DetectorTypeEnum | null>(null);
  const [locationType, setLocationType] =
    React.useState<DetectorLocationTypeEnum | null>(null);
  const [location, setLocation] = React.useState<DetectorLocationEnum | null>(
    null
  );
  const [socketIndex, setSocketIndex] = React.useState<number | null>(null);
  const [detectors, setDetectors] = React.useState<DetectorData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (detectorData) {
      setName(detectorData.name!);
      setType(detectorData.type!);
      setLocationType(detectorData.locationType!);
      setLocation(detectorData.location!);
      setSocketIndex(detectorData.socketIndex!);
    }

    if (baseDetectorType) {
      setType(baseDetectorType);
    }
  }, [detectorData, baseDetectorType]);

  useEffect(() => {
    setLoading(true);

    getDetectors(AsyncStorage)
      .pipe(
        first(),
        tap((_) => setLoading(false))
      )
      .subscribe((detectors) => setDetectors(detectors));
  }, []);

  const isDetectorValid = () => {
    return (
      name.length > 0 && !!type && !!locationType && !!location && !!socketIndex
    );
  };

  const handleSelectDetectorType = (detectorType: DetectorTypeEnum) => {
    setType(detectorType);
  };

  const handleSelectLocationType = (locationType: DetectorLocationTypeEnum) => {
    setLocationType(locationType);
  };

  const handleSelectLocation = (location: DetectorLocationEnum) => {
    setLocation(location);
  };

  const handleSelectSocketIndex = (socketIndex: number) => {
    setSocketIndex(socketIndex);
  };

  const handleSave = () => {
    let updatedDetectors: DetectorData[];

    if (detectorData) {
      const detectorIndex = detectors.findIndex(
        (d) => d.id === detectorData.id
      );
      updatedDetectors = [...detectors];
      updatedDetectors[detectorIndex] = {
        ...detectorData,
        name,
        type: type!,
        locationType: locationType!,
        location: location!,
        socketIndex: socketIndex!,
      };
    } else {
      updatedDetectors = [
        ...detectors,
        {
          id: new Date().getTime(),
          name,
          type: type!,
          locationType: locationType!,
          location: location!,
          socketIndex: socketIndex!,
          hasError: false,
        },
      ];
    }

    updateDetectors(updatedDetectors, AsyncStorage)
      .pipe(first())
      .subscribe({
        next: () =>
          navigation.navigate(ScreenNamesEnum.DETECTORS_GROUP_DETAILS, {
            detectorType: baseDetectorType,
          }),
        error: (error) => console.error(error),
      });
  };

  return (
    <View style={styles.initContainer}>
      <WavyBackground color={ColorsEnum.GREEN_DARK} />
      <NavBar navigation={navigation} showSettings={false} showHelp={false} />
      <View style={styles.layoutContainer}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {LANGUAGE
              ? LANGUAGE.DETECTORS_SETUP[
                  detectorData ? "EDIT_DETECTOR" : "ADD_NEW_DETECTOR"
                ]
              : ""}
          </Text>
        </View>
        <ScrollView
          style={styles.fullScreenScrollView}
          contentContainerStyle={styles.centeredContainer}
        >
          <View style={styles.detectorAddSection}>
            <View style={styles.detectorAddSectionTitleContainer}>
              <Text style={styles.detectorAddSectionTitle}>
                {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SET_NAME : ""}
              </Text>
            </View>
            <View style={styles.detectorAddSectionInput}>
              <TextInput
                style={styles.detectorAddSectionInputText}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
          <View style={styles.detectorAddSection}>
            <View style={styles.detectorAddSectionTitleContainer}>
              <Text style={styles.detectorAddSectionTitle}>
                {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SELECT_DETECTOR_TYPE : ""}
              </Text>
            </View>
            <View style={styles.detectorAddSectionOptions}>
              <TouchableOpacity
                style={
                  !!type && type === DetectorTypeEnum.ULTRA_SONIC
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() =>
                  handleSelectDetectorType(DetectorTypeEnum.ULTRA_SONIC)
                }
              >
                <Image
                  source={require("../../../../../assets/icons/sound.png")}
                  style={styles.detectorAddSectionExpandedOptionIcon}
                />
                <Text
                  style={
                    !!type && type === DetectorTypeEnum.ULTRA_SONIC
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE
                    ? LANGUAGE.DETECTORS_SETUP.DETECTORS.ULTRA_SONIC
                    : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!type && type === DetectorTypeEnum.INFRARED
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() =>
                  handleSelectDetectorType(DetectorTypeEnum.INFRARED)
                }
              >
                <Image
                  source={require("../../../../../assets/icons/infrared.png")}
                  style={styles.detectorAddSectionExpandedOptionIcon}
                />
                <Text
                  style={
                    !!type && type === DetectorTypeEnum.INFRARED
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.DETECTORS.INFRARED : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!type && type === DetectorTypeEnum.LIDAR
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectDetectorType(DetectorTypeEnum.LIDAR)}
              >
                <Image
                  source={require("../../../../../assets/icons/lidar.png")}
                  style={styles.detectorAddSectionExpandedOptionIcon}
                />
                <Text
                  style={
                    !!type && type === DetectorTypeEnum.LIDAR
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.DETECTORS.LIDAR : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detectorAddSection}>
            <View style={styles.detectorAddSectionTitleContainer}>
              <Text style={styles.detectorAddSectionTitle}>
                {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SELECT_LOCATION_TYPE : ""}
              </Text>
            </View>
            <View style={styles.detectorAddSectionOptions}>
              <TouchableOpacity
                style={
                  !!locationType &&
                  locationType === DetectorLocationTypeEnum.FRONT
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() =>
                  handleSelectLocationType(DetectorLocationTypeEnum.FRONT)
                }
              >
                <Text
                  style={
                    !!locationType &&
                    locationType === DetectorLocationTypeEnum.FRONT
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.LOCATION_TYPE.FRONT : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!locationType &&
                  locationType === DetectorLocationTypeEnum.BACK
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() =>
                  handleSelectLocationType(DetectorLocationTypeEnum.BACK)
                }
              >
                <Text
                  style={
                    !!locationType &&
                    locationType === DetectorLocationTypeEnum.BACK
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.LOCATION_TYPE.BACK : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detectorAddSection}>
            <View style={styles.detectorAddSectionTitleContainer}>
              <Text style={styles.detectorAddSectionTitle}>
                {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SELECT_LOCATION : ""}
              </Text>
            </View>
            <View style={styles.detectorAddSectionOptions}>
              <TouchableOpacity
                style={
                  !!location && location === DetectorLocationEnum.LEFT
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectLocation(DetectorLocationEnum.LEFT)}
              >
                <Text
                  style={
                    !!location && location === DetectorLocationEnum.LEFT
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.LOCATION.LEFT : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!location && location === DetectorLocationEnum.CENTER_LEFT
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() =>
                  handleSelectLocation(DetectorLocationEnum.CENTER_LEFT)
                }
              >
                <Text
                  style={
                    !!location && location === DetectorLocationEnum.CENTER_LEFT
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE
                    ? LANGUAGE.DETECTORS_SETUP.LOCATION.CENTER_LEFT
                    : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!location && location === DetectorLocationEnum.CENTER_RIGHT
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() =>
                  handleSelectLocation(DetectorLocationEnum.CENTER_RIGHT)
                }
              >
                <Text
                  style={
                    !!location && location === DetectorLocationEnum.CENTER_RIGHT
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE
                    ? LANGUAGE.DETECTORS_SETUP.LOCATION.CENTER_RIGHT
                    : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!location && location === DetectorLocationEnum.RIGHT
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectLocation(DetectorLocationEnum.RIGHT)}
              >
                <Text
                  style={
                    !!location && location === DetectorLocationEnum.RIGHT
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.LOCATION.RIGHT : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detectorAddSection}>
            <View style={styles.detectorAddSectionTitleContainer}>
              <Text style={styles.detectorAddSectionTitle}>
                {LANGUAGE ? LANGUAGE.DETECTORS_SETUP.SELECT_SOCKET : ""}
              </Text>
            </View>
            <View style={styles.detectorAddSectionOptions}>
              <TouchableOpacity
                style={
                  !!socketIndex && socketIndex === 1
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectSocketIndex(1)}
              >
                <Text
                  style={
                    !!socketIndex && socketIndex === 1
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!socketIndex && socketIndex === 2
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectSocketIndex(2)}
              >
                <Text
                  style={
                    !!socketIndex && socketIndex === 2
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!socketIndex && socketIndex === 3
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectSocketIndex(3)}
              >
                <Text
                  style={
                    !!socketIndex && socketIndex === 3
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  3
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !!socketIndex && socketIndex === 4
                    ? styles.detectorAddSectionOptionActive
                    : styles.detectorAddSectionOption
                }
                onPress={() => handleSelectSocketIndex(4)}
              >
                <Text
                  style={
                    !!socketIndex && socketIndex === 4
                      ? styles.detectorAddSectionOptionTextActive
                      : styles.detectorAddSectionOptionText
                  }
                >
                  4
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ActionButton
            title={
              LANGUAGE
                ? LANGUAGE.DETECTORS_SETUP[detectorData ? "SAVE" : "ADD"]
                : ""
            }
            disabled={!isDetectorValid()}
            action={handleSave}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddEditDetectorScreen;
