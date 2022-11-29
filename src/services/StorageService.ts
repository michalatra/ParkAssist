import AsyncStorage from "@react-native-async-storage/async-storage";
import {BehaviorSubject, Subject} from "rxjs";

const savingFinished = new Subject<boolean>();
export const savingFinished$ = savingFinished.asObservable();

const readingResult = new BehaviorSubject<any>(null);
export const readingResult$ = readingResult.asObservable();

const saveValue = (key: string, value: any) => {
    const jsonValue = JSON.stringify(value)
    AsyncStorage.setItem(key, jsonValue)
        .then(_ => savingFinished.next(true));

    return savingFinished$;
}

const readValue = (key: string): any => {
    AsyncStorage.getItem(key)
        .then(jsonValue => jsonValue != null ? JSON.parse(jsonValue) : null)
        .then(res => readingResult.next(res));

    return readingResult$;
}