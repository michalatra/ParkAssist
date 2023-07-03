import React, { useEffect, useReducer, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { styles, windowWidth } from "../../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  combineLatest,
  combineLatestWith,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs";
import {
  currentMeasurement$,
  measurementFinished$,
} from "../../../services/BluetoothService";
import { BluetoothResponse } from "../../../models/BluetoothResponse";
import { IndicatorData } from "../../../models/IndicatorData";
import { DetectorStorageData } from "../../../models/DetectorStorageData";
import { DetectorTypeEnum } from "../../../models/enums/DetectorTypeEnum";
import { getDetectors } from "../../../services/DetectorsService";
import { View } from "react-native";

const getDegree = (locationId: number): number => {
  switch (locationId) {
    case 0: {
      return -162.6;
    }
    case 1: {
      return -123.8;
    }
    case 2: {
      return -85;
    }
    case 3: {
      return -46.2;
    }
    case 4: {
      return 133.8;
    }
    case 5: {
      return 95;
    }
    case 6: {
      return 56.2;
    }
    case 7: {
      return 17.4;
    }
  }

  return 0;
};

const MeasurementIndicator = () => {
  const [indicators, setIndicators] = useState<IndicatorData[]>([]);

  const strokeWidth = 20;
  const radius = (windowWidth * 0.8) / 2 - strokeWidth / 2;
  const innerRadius = radius - strokeWidth / 2;
  const maxDistance = 100;

  useEffect(() => {
    const subscription = getDetectors(AsyncStorage)
      .pipe(
        tap((detectors) => handleCreateIndicators(detectors)),
        combineLatestWith(currentMeasurement$),
        takeUntil(measurementFinished$),
        filter(
          ([detectors, currentMeasurement]) =>
            !!detectors && !!currentMeasurement
        )
      )
      .subscribe(([detectors, currentMeasurement]) => {
        setIndicators((indicators) =>
          handleUpdateIndicators(indicators, currentMeasurement, detectors)
        );
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdateIndicators = (
    indicators: IndicatorData[],
    currentMeasurement: BluetoothResponse,
    detectors: DetectorStorageData
  ): IndicatorData[] => {
    const updatedIndicators = [...indicators];

    currentMeasurement.ultrasonic?.forEach((detector, idx) => {
      console.log("detector", detector / maxDistance);
      updatedIndicators[idx].radius = Math.min(detector / maxDistance, 1);
      updatedIndicators[idx].color = detector > 100 ? "green" : "red";
    });

    if (currentMeasurement.singlePointLidar) {
      updatedIndicators[detectors[DetectorTypeEnum.ULTRA_SONIC].length].radius =
        Math.min(currentMeasurement.singlePointLidar / maxDistance, 1);
      updatedIndicators[detectors[DetectorTypeEnum.ULTRA_SONIC].length].color =
        currentMeasurement.singlePointLidar > 100 ? "green" : "red";
    }

    if (currentMeasurement.multiPointLidar) {
      updatedIndicators[
        detectors[DetectorTypeEnum.ULTRA_SONIC].length +
          detectors[DetectorTypeEnum.SINGLE_POINT_LIDAR].length
      ].radius = Math.min(
        currentMeasurement.multiPointLidar.reduce(
          (acc, curr) => acc + curr,
          0
        ) /
          currentMeasurement.multiPointLidar.length /
          10 /
          maxDistance,
        1
      );
      // updatedIndicators[detectors[DetectorTypeEnum.ULTRA_SONIC].length].color =
      //   currentMeasurement.multiPointLidar > 100 ? "green" : "red";
    }

    console.log("updatedIndicators", updatedIndicators);

    return updatedIndicators;
  };

  const handleCreateIndicators = (detectorsData: DetectorStorageData) => {
    const detectors = [
      ...detectorsData[DetectorTypeEnum.ULTRA_SONIC],
      ...detectorsData[DetectorTypeEnum.SINGLE_POINT_LIDAR],
      ...detectorsData[DetectorTypeEnum.MULTI_POINT_LIDAR],
    ];

    const updatedIndicators: IndicatorData[] = detectors.map(
      (detectorData) => ({
        radius: 1,
        color: "green",
        rotation: getDegree(
          detectorData.locationType * 4 + detectorData.location
        ),
      })
    );

    console.log("Indicators: ", updatedIndicators);

    setIndicators(updatedIndicators);
  };

  return (
    <View style={styles.measurementIndicatorContainer}>
      {indicators.map((indicator, idx) => (
        <Svg
          style={{
            ...styles.measurementIndicator,
            transform: [{ rotateZ: `${indicator.rotation}deg` }],
          }}
          key={idx}
        >
          <Circle
            cx={(windowWidth * 0.8) / 2}
            cy={(windowWidth * 0.8) / 2}
            r={innerRadius * indicator.radius}
            fill="transparent"
            stroke={indicator.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${2 * Math.PI * innerRadius * indicator.radius}`}
            strokeDashoffset={
              2 * Math.PI * innerRadius * indicator.radius * 0.92
            }
            strokeLinecap="round"
          />
        </Svg>
      ))}
    </View>
  );
};

export default MeasurementIndicator;
