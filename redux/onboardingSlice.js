import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    userInformation: {
      age: null,
      gender: null,
      processedFoodConsumption: null, // 5 days
      MedicalConditions: [],
      Motivations: [],
      LikeFeatures: [],
    },
  },
  reducers: {
    setAge(state, action) {
      console.log(action.payload, 'AGE');
      state.userInformation.age = action.payload;
    },
    setGender(state, action) {
      state.userInformation.gender = action.payload;
    },
    setProcessedFoodConsumption(state, action) {
      state.userInformation.processedFoodConsumption = action.payload;
    },
    setMedicalConditions(state, action) {
      state.userInformation.MedicalConditions = action.payload;
    },
    setMotivations(state, action) {
      state.userInformation.Motivations = action.payload;
    },
    setLikeFeatures(state, action) {
      state.userInformation.LikeFeatures = action.payload;
    },
  },
});

export const {
  setLikeFeatures,
  setMotivations,
  setMedicalConditions,
  setProcessedFoodConsumption,
  setAge,
  setGender,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
