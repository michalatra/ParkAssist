import { DetectorData } from "./DetectorData";
import { DetectorTypeEnum } from "./enums/DetectorTypeEnum";

export interface DetectorStorageData {
  [DetectorTypeEnum.ULTRA_SONIC]: DetectorData[];
  [DetectorTypeEnum.SINGLE_POINT_LIDAR]: DetectorData[];
  [DetectorTypeEnum.MULTI_POINT_LIDAR]: DetectorData[];
}
