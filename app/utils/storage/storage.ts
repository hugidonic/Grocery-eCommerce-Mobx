import AsyncStorage from "@react-native-async-storage/async-storage"
import { StorageKeys, STORAGE_KEYS } from "./storageKeys"

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: StorageKeys): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: StorageKeys, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load<T>(key: StorageKeys): Promise<T | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key)
    return JSON.parse(almostThere) as T | null
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save<T>(key: StorageKeys, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: StorageKeys): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch {}
}
