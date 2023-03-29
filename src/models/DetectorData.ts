import { DetectorTypeEnum } from "./enums/DetectorTypeEnum";
import { DetectorLocationTypeEnum } from "./enums/DetectorLocationTypeEnum";
import { DetectorLocationEnum } from "./enums/DetectorLocationEnum";

export interface DetectorData {
  id: number;
  socketIndex: number;
  name: string;
  type: DetectorTypeEnum;
  locationType: DetectorLocationTypeEnum;
  location: DetectorLocationEnum;
  hasError: boolean;
}
