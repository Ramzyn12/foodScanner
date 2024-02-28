import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "grocery",
  initialState: {
    currentGroceries: [],
    virtuallyRemovedItem: null,
    virtuallyRemovedIndex: -1,
    checkedCount: 0, 
    sortPreference: 'Manual'
  },
  reducers: {
    setCurrentGroceries(state, action) {
      if (action.payload.itemOrder.length > 0) {
        state.currentGroceries = [...action.payload.itemOrder].map((id) =>
          action.payload.groceries.find((item) => item.item._id === id)
        );
      } else {
        state.currentGroceries = action.payload.groceries;
      }
    },
    setSortPreference(state, action) {
      state.sortPreference = action.payload
    },
    restartCount(state, action) {
      state.checkedCount = 0
    },
    checkGrocery(state, action) {
      const id = action.payload;
      const groceryIndex = state.currentGroceries.findIndex(grocery => grocery._id === id);
      if (groceryIndex !== -1) {
        state.currentGroceries[groceryIndex].checked = !state.currentGroceries[groceryIndex].checked;
        // Adjust the counter based on the new checked state
        state.checkedCount += state.currentGroceries[groceryIndex].checked ? 1 : -1;
      }
    },
    removeVirtualGroceryItem(state, action) {
      state.virtuallyRemovedItem = state.currentGroceries.find(
        (item) => item._id === action.payload
      );
      state.virtuallyRemovedIndex = state.currentGroceries.findIndex(
        (item) => item._id === action.payload
      );

      state.currentGroceries = state.currentGroceries.filter(
        (item) => item._id !== action.payload
      );
    },
    addVirtualGroceryItem(state, action) {
      if (state.virtuallyRemovedItem && state.virtuallyRemovedIndex !== -1) {
        state.currentGroceries.splice(state.virtuallyRemovedIndex, 0, state.virtuallyRemovedItem);
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
  setSortPreference
} = grocerySlice.actions;
export default grocerySlice.reducer;
