import { createSlice } from "@reduxjs/toolkit";

const grocerySlice = createSlice({
  name: "grocery",
  initialState: {
    currentGroceries: [],
    virtuallyRemovedItem: null,
    virtuallyRemovedIndex: -1,
    deletionPendingItems: [], // Track items that are pending deletion
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
    checkGrocery(state, action) {
      const id = action.payload;
      const groceryIndex = state.currentGroceries.findIndex(
        (grocery) => grocery._id === id
      );
      if (groceryIndex !== -1) {
        state.currentGroceries[groceryIndex].checked =
          !state.currentGroceries[groceryIndex].checked;
        // Adjust the counter based on the new checked state
      }
    },
    unmarkAllChecked(state) {
      state.currentGroceries = state.currentGroceries.map((groceryItem) => ({
        ...groceryItem,
        checked: false,
      }));
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
    sortByTitle(state, action) {
      const groceries = action.payload?.groceries;
      if (groceries) {
        state.currentGroceries = groceries.slice().sort((a, b) => {
          const titleA = a.item.name.toUpperCase(); // assuming the title is stored under item.title
          const titleB = b.item.name.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      }
    },
    sortByDateAdded(state, action) {
      const groceries = action.payload.groceries;
      if (groceries) {
        console.log(groceries);
        state.currentGroceries = groceries.slice().sort((a, b) => {
          const dateA = new Date(a.createdAt); // assuming createdAt is directly on the grocery item
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        });
      }
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
  unmarkAllChecked,
  confirmDeletion,
  sortByTitle,
  sortByDateAdded,
  setSortPreference,
} = grocerySlice.actions;
export default grocerySlice.reducer;
