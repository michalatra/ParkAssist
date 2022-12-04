import { from, Observable } from "rxjs";
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

export const saveValue = (
  storage: AsyncStorageStatic,
  key: string,
  value: any
) => {
  const jsonValue = JSON.stringify(value);
  return from(storage.setItem(key, jsonValue).then((_) => true));
};

export const readValue = (
  storage: AsyncStorageStatic,
  key: string
): Observable<any> => {
  return from(
    storage
      .getItem(key)
      .then((jsonValue) => (jsonValue != null ? JSON.parse(jsonValue) : null))
  );
};
