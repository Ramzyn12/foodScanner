Food Items Fetch, Display and Add flows

1. Food detail page is opened via scan or food item selection
2. If barcode we fetchFoodWithBarcode, if singleFoodId we fetchFoodWithIvyId
3. Given the result from either cases we create a normalised data object for redux to use in the child foodDetail components
4. For example, when we add a food item to the diary, we send both the singleFoodId and the barcode as well as the other data needed for our mongoose Model
5. Our backend then differentates between the barcode or singleFoodId to handle the two cases.
6. These two cases are namely, adding the food item to consumedFoods field in the DiaryDay or the consumedSingleFoods field instead.
7. This is similar to grocery list functionality although in grocery list we have one groceries Field which holds a polymorphic association to both models


Note: On the frontend, we only control the adding to diaryList and groceryList from the foodDetails page (buttons), hence this is why it is where we use the big normalised data. And it is only normalised because the singleFoods and FoodItem have different structures


Diary Days

1. When someone first joins via apple, we log them in using the credentials and then sign them up on the backend. Then when this backend succeeds we log them in and then for the get all diary days we just create one using their userId which is available since the backend is responsible for creating a user. If we already had an apple account then we dont


List item is rendered when:
1. Groceries list item
2. Diary list item
3. Search results list
4. Recents results list
This all comes from the FoodItem and singleFood models in mongoDB so we could just add a processedState when we addFoodToDiary or addFoodToGroceryList (since this is when we add it to our database)

Backend Logic for the Logging of data

Lets say we log some info for a specific model like this

const healthMetricSchema = new mongoose.Schema({
  metricType: {
    type: String,
    required: true,
    enum: ['Weight', 'Anxiety', 'BrainFog',...],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  metricValue: {
    type: Number,
    required: true,
    // Add custom validation if needed, depending on the metricType like 1 - 10 if not weight
  },
  unitOfMeasure: {
    type: String,
    enum: ['kg', 'lbs', 'N/A'], // N/A for non-quantitative metrics like Anxiety, BrainFog
    required: function() { return this.metricType === 'Weight'; }, // Conditional requirement
  },
  runningAverage: {
    type: Number,
    required: true, // Assuming pre-calculation before document save
    // No default value; should be calculated dynamically based on previous records
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Custom validation or methods can be added here
// For example, a pre-save hook to calculate the running average

For each card on me page just get the latest document
For the graphs just use the amount of days as the time frame chosen from dropdown


