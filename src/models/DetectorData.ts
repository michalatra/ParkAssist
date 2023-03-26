import { DetectorTypeEnum } from "./enums/DetectorTypeEnum";

export interface DetectorData {
  id: number;
  socketIndex: string;
  detectorType: DetectorTypeEnum;
  hasError: boolean;
}
