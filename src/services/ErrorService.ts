import { Subject } from "rxjs";
import { ErrorData } from "../models/ErrorData";

const errorStream = new Subject<ErrorData>();
export const errorStream$ = errorStream.asObservable();

export const reportError = (error: ErrorData) => {
  errorStream.next(error);
};
