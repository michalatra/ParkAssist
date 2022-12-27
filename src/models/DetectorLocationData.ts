import { DetectorLocationTypeEnum } from "./enums/DetectorLocationTypeEnum";
import { DetectorLocationEnum } from "./enums/DetectorLocationEnum";

export interface DetectorLocationData {
  locationType: DetectorLocationTypeEnum;
  location: DetectorLocationEnum;
  active: boolean;
  index?: number;
  measurement: number;
}
