import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

const savingFinished = new Subject<boolean>();
export const savingFinished$ = savingFinished.asObservable();

const readingResult = new BehaviorSubject<any>(null);
export const readingResult$ = readingResult.asObservable();

export const saveValue = (
  storage: AsyncStorageStatic,
  key: string,
  value: any
) => {
  const jsonValue = JSON.stringify(value);
  storage.setItem(key, jsonValue).then((_) => savingFinished.next(true));

  return savingFinished$;
};

export const readValue = (
  storage: AsyncStorageStatic,
  key: string
): Observable<any> => {
  storage
    .getItem(key)
    .then((jsonValue) => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .then((res) => readingResult.next(res));

  return readingResult$;
};
