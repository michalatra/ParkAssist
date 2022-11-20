import { DetectorLocationData } from "../models/DetectorLocationData";
import { DetectorLocationTypeEnum } from "../models/enums/DetectorLocationTypeEnum";
import { DetectorLocationEnum } from "../models/enums/DetectorLocationEnum";

let detectorsCount = 0;
let detectorsLocations: DetectorLocationData[] = [];

export const getDetectorLocations = (): DetectorLocationData[] => {
  return [
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.LEFT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.CENTER_LEFT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.CENTER_RIGHT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.FRONT,
      location: DetectorLocationEnum.RIGHT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.LEFT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.CENTER_LEFT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.CENTER_RIGHT,
      active: false,
    },
    {
      locationType: DetectorLocationTypeEnum.BACK,
      location: DetectorLocationEnum.RIGHT,
      active: false,
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
