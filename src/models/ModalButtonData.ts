import { ModalButtonTypeEnum } from "./enums/ModalButtonTypeEnum";

export interface ModalButtonData {
  text: string;
  type: ModalButtonTypeEnum;
  onClick: any;
}
