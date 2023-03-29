import { DetectorLocationData } from "../models/DetectorLocationData";
import { DetectorLocationTypeEnum } from "../models/enums/DetectorLocationTypeEnum";
import { DetectorLocationEnum } from "../models/enums/DetectorLocationEnum";
import { DetectorData } from "../models/DetectorData";
import { map, Observable, of } from "rxjs";
import { StorageKeysEnum } from "../models/enums/StorageKeysEnum";
import { readValue, saveValue } from "./StorageService";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

let detectorsCount = 0;
let detectorsLocations: DetectorLocationData[] = [];

export const getDetectorLocations = (): DetectorLocationData[] => {
  return [
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.LEFT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.CENTER_LEFT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.CENTER_RIGHT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.RIGHT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.LEFT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.CENTER_LEFT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.CENTER_RIGHT,
      active: false,
      measurement: 0,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.RIGHT,
      active: false,
      measurement: 0,
    },
  ];
};

export const setDetectorsCount = (count: number) => {
  detectorsCount = count;
};

export const getDetectorsCount = (): number => {
  return detectorsCount;
};

export const setDetectorsLocations = (locations: DetectorLocationData[]) => {
  detectorsLocations = locations;
};

export const getDetectorsLocations = (): DetectorLocationData[] => {
  return detectorsLocations;
};

export const getDetectors = (
  storage: AsyncStorageStatic
): Observable<DetectorData[]> => {
  return readValue(storage, StorageKeysEnum.DETECTORS).pipe(
    map((detectors: DetectorData[]) => detectors || [])
  );
};

export const updateDetectors = (
  detectors: DetectorData[],
  storage: AsyncStorageStatic
): Observable<any> => {
  return saveValue(storage, StorageKeysEnum.DETECTORS, detectors);
};
