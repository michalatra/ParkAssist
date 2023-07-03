import { ToastType } from "./enums/ToastType";

export interface ToastData {
  message: string | number;
  type: ToastType;
}
