import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "food",
  initialState: {
    currentGroceries: [],
  },
  reducers: {
    setCurrentGroceries(state, action) {
      //Need to fix this, its using the wrong id, look in mongoDB
      console.log(action.payload.groceries);
      if (action.payload.itemOrder.length > 0) {
        state.currentGroceries = [...action.payload.itemOrder].map((id) =>
          action.payload.groceries.find((item) => item.item._id === id)
        );
      } else {
        state.currentGroceries = action.payload.groceries
      }
    },
    checkGrocery(state, action) {
      const id = action.payload; // Assuming the payload is the ID of the grocery to check
      const groceryIndex = state.currentGroceries.findIndex(
        (grocery) => grocery._id === id
      );
      if (groceryIndex !== -1) {
        // Toggling the checked state of the found grocery item
        state.currentGroceries[groceryIndex].checked =
          !state.currentGroceries[groceryIndex].checked;
      }
    },
    // removeGroceryItem(state, action) {
    //   state.currentGroceries = state.currentGroceries.filter(item => item._id !== action.payload)
    // },
    // addGroceryItem(state, action) {
    //   state.currentGroceries = state.currentGroceries.push(action.payload)
    // },
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
} = grocerySlice.actions;
export default grocerySlice.reducer;
