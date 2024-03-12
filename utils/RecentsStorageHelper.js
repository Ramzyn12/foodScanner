import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENTS_STORAGE_KEY = "RECENT_SCANS";

// Save a recent scan
export async function saveRecentScan(foodItem) {
  try {
    const existingRecents = await getRecentScans();

    if (
      !existingRecents.some((item) => item.brand === foodItem.brand) &&
      !existingRecents.some((item) => item.name === foodItem.name)
    ) {
      const updatedRecents = [foodItem, ...existingRecents].slice(0, 10); // Keep only the most recent 10 items
      await AsyncStorage.setItem(
        RECENTS_STORAGE_KEY,
        JSON.stringify(updatedRecents)
      );
    }
  } catch (error) {
    console.error("Error saving recent scan:", error);
  }
}

// Retrieve the list of recent scans
export async function getRecentScans() {
  try {
    const recents = await AsyncStorage.getItem(RECENTS_STORAGE_KEY);
    return recents ? JSON.parse(recents) : [];
  } catch (error) {
    console.error("Error fetching recent scans:", error);
    return [];
  }
}

export async function clearRecentScans() {
  try {
    const recents = await AsyncStorage.setItem(
      RECENTS_STORAGE_KEY,
      JSON.stringify([])
    );
  } catch (error) {
    console.error("Error fetching recent scans:", error);
    return [];
  }
}
