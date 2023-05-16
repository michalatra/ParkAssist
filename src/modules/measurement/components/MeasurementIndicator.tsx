import React, { useEffect, useReducer, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { styles, windowWidth } from "../../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { filter, map, mergeMap, switchMap, take, takeUntil, tap } from "rxjs";
import {
  currentMeasurement$,
  measurementFinished$,
} from "../../../services/BluetoothService";
import { BluetoothResponse } from "../../../models/BluetoothResponse";
import { IndicatorData } from "../../../models/IndicatorData";
import { DetectorStorageData } from "../../../models/DetectorStorageData";
import { DetectorTypeEnum } from "../../../models/enums/DetectorTypeEnum";
import {
  getDetectors,
  updateDetectors,
} from "../../../services/DetectorsService";
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
  const [detectors, setDetectors] = useState<DetectorStorageData>({
    [DetectorTypeEnum.ULTRA_SONIC]: [],
    [DetectorTypeEnum.SINGLE_POINT_LIDAR]: [],
    [DetectorTypeEnum.MULTI_POINT_LIDAR]: [],
  });

  const strokeWidth = 20;
  const radius = (windowWidth * 0.8) / 2 - strokeWidth / 2;
  const innerRadius = radius - strokeWidth / 2;
  const maxDistance = 200;

  useEffect(() => {
    getDetectors(AsyncStorage)
      .pipe(tap((detectors) => handleCreateIndicators(detectors)))
      .subscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      currentMeasurement$
        .pipe(take(1), filter(Boolean))
        .subscribe((currentMeasurement) => {
          setIndicators((prevState) =>
            handleUpdateIndicators(prevState, currentMeasurement)
          );
        });
    }, 400);

    measurementFinished$.subscribe(() => {
      clearInterval(interval);
    });

    // return () => subscription.unsubscribe();
  }, []);

  const handleUpdateIndicators = (
    indicators: IndicatorData[],
    currentMeasurement: BluetoothResponse
  ): IndicatorData[] => {
    console.log(currentMeasurement);
    const updatedIndicators = [...indicators];

    currentMeasurement.ultrasonic?.forEach((detector, idx) => {
      updatedIndicators[idx].radius = Math.min(detector / maxDistance, 1);
      updatedIndicators[idx].color = detector > 100 ? "green" : "red";
    });

    if (currentMeasurement.singlePointLidar) {
      updatedIndicators[detectors[DetectorTypeEnum.ULTRA_SONIC].length].radius =
        Math.min(currentMeasurement.singlePointLidar / maxDistance, 1);
      updatedIndicators[detectors[DetectorTypeEnum.ULTRA_SONIC].length].color =
        currentMeasurement.singlePointLidar > 100 ? "green" : "red";
    }

    return updatedIndicators;
  };

  const handleCreateIndicators = (detectorsData: DetectorStorageData) => {
    setDetectors(detectorsData);

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
