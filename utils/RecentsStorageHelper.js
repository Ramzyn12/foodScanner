import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENTS_STORAGE_KEY = "RECENT_SCANS";

// Save a recent scan
export async function saveRecentScan(foodItem) {
  if (!foodItem.singleFoodId && !foodItem.barcode) return;

  try {
    const existingRecents = await getRecentScans();


    // If already in list just move to top
    if (
      existingRecents.some(
        (item) =>
          item.singleFoodId && item.singleFoodId === foodItem.singleFoodId
      ) ||
      existingRecents.some(
        (item) => item.barcode && item.barcode === foodItem.barcode
      )
    ) {
      const index = existingRecents.findIndex(
        (item) => item.name === foodItem.name
      );
      existingRecents.splice(index, 1);
      const updatedRecents = [foodItem, ...existingRecents].slice(0, 10); // Keep only the most recent 10 items
      await AsyncStorage.setItem(
        RECENTS_STORAGE_KEY,
        JSON.stringify(updatedRecents)
      );
    } else {
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
