import { shareReplay, Subject } from "rxjs";
import { ToastData } from "../models/ToastData";
import { ToastType } from "../models/enums/ToastType";

const toastStream = new Subject<ToastData>();
export const toastStream$ = toastStream.asObservable();

export const showToast = (message: string | number, type: ToastType) => {
  const toast = {
    message: message,
    type: type,
  };

  toastStream.next(toast);
};
