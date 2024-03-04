import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "grocery",
  initialState: {
    currentGroceries: [],
    virtuallyRemovedItem: null,
    virtuallyRemovedIndex: -1,
    deletionPendingItems: [], // Track items that are pending deletion
    checkedCount: 0,
    sortPreference: "Manual",
  },
  reducers: {
    setCurrentGroceries(state, action) {
      let groceries;
      if (action.payload.itemOrder.length > 0) {
        groceries = [...action.payload.itemOrder].map((id) =>
          action.payload.groceries.find((item) => item.item._id === id)
        );
      } else {
        groceries = action.payload.groceries;
      }

      // Filter out items that are in the deletionPendingItems list
      state.currentGroceries = groceries.filter(
        (item) => !state.deletionPendingItems.includes(item._id)
      );
    },
    setSortPreference(state, action) {
      state.sortPreference = action.payload;
    },
    restartCount(state, action) {
      state.checkedCount = 0;
    },
    checkGrocery(state, action) {
      const id = action.payload;
      const groceryIndex = state.currentGroceries.findIndex(
        (grocery) => grocery._id === id
      );
      if (groceryIndex !== -1) {
        state.currentGroceries[groceryIndex].checked =
          !state.currentGroceries[groceryIndex].checked;
        // Adjust the counter based on the new checked state
        state.checkedCount += state.currentGroceries[groceryIndex].checked
          ? 1
          : -1;
      }
    },
    removeVirtualGroceryItem(state, action) {
      const itemId = action.payload;

      state.virtuallyRemovedItem = state.currentGroceries.find(
        (item) => item._id === itemId
      );
      state.virtuallyRemovedIndex = state.currentGroceries.findIndex(
        (item) => item._id === itemId
      );

      if (!state.deletionPendingItems.includes(itemId)) {
        state.deletionPendingItems.push(itemId);
      }
      state.currentGroceries = state.currentGroceries.filter(
        (item) => item._id !== itemId
      );
    },
    addVirtualGroceryItem(state, action) {
      state.deletionPendingItems = state.deletionPendingItems.filter(
        (itemId) => itemId !== state.virtuallyRemovedItem._id
      );

      if (state.virtuallyRemovedItem && state.virtuallyRemovedIndex !== -1) {
        state.currentGroceries.splice(
          state.virtuallyRemovedIndex,
          0,
          state.virtuallyRemovedItem
        );
        state.virtuallyRemovedItem = null; // Resetting it back to null after adding it back
        state.virtuallyRemovedIndex = -1; // Also reset the index
      }
    },
    sortByProcessedScore(state, action) {
      state.currentGroceries = [...action.payload].sort((a, b) => {
        const scoreA = a?.item?.processedScore;
        const scoreB = b?.item?.processedScore;
        return scoreA - scoreB;
      });
    },
    confirmDeletion(state, action) {
      // Remove the confirmed deleted item from the deletionPendingItems list
      const itemId = action.payload;
      state.deletionPendingItems = state.deletionPendingItems.filter(
        (id) => id !== itemId
      );
    },
    updateGroceryOrder(state, action) {
      state.currentGroceries = action.payload;
    },
  },
});

export const {
  setCurrentGroceries,
  removeGroceryItem,
  checkGrocery,
  updateGroceryOrder,
  sortByProcessedScore,
  removeVirtualGroceryItem,
  addVirtualGroceryItem,
  restartCount,
  confirmDeletion,
  setSortPreference,
} = grocerySlice.actions;
export default grocerySlice.reducer;
