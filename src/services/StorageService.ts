import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

let storage: AsyncStorageStatic;

const savingFinished = new Subject<boolean>();
export const savingFinished$ = savingFinished.asObservable();

const readingResult = new BehaviorSubject<any>(null);
export const readingResult$ = readingResult.asObservable();

export const init = (asyncStorage: AsyncStorageStatic) => {
  storage = asyncStorage;
}

export const saveValue = (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  storage.setItem(key, jsonValue).then((_) => savingFinished.next(true));

  return savingFinished$;
};

export const readValue = (key: string): Observable<any> => {
  storage
    .getItem(key)
    .then((jsonValue) => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .then((res) => readingResult.next(res));

  return readingResult$;
};
