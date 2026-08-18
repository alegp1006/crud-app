import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useStateLocalStorage<T>({
  key,
  initialValue,
}: {
  key: string;
  initialValue: T;
}): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return item || initialValue;
  });

  useEffect(() => {
    setItem({ key, value });
  }, [value]);

  return [value, setValue];
}

export function setItem<T>({ key, value }: { key: string; value: T }) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log(error);
  }
}
