import { ErrorTypeEnum } from "./enums/ErrorTypeEnum";

export interface ErrorData {
  title: string;
  description: string;
  type: ErrorTypeEnum;
  onAccept?: any;
}
