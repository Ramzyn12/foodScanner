When i scan a food I can choose to add it to the foods i have eaten today or remove it

when i go to the main dairy I can see the foods ive eaten today with their scores as well as my overall score

I also have a weekly header view loaded which shows me my scores for all those weeks. I can press on any day and it will fetch the full view of foods ive eaten that day and their scores

we have some recent documents of food items, maybe these get deleted after 30 days or something like that - maybe do this on phones memory tho! so we can see

models:

const userSchema = new mongoose.Schema({
userId: String,
email: String,
username: String,
streak: Number,
});

const diaryDaySchema = new mongoose.Schema({
date: Date,
diaryDayId: mongoose.Schema.Types.ObjectId,
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
consumedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }],
createdAt: Date,
updatedAt: Date,
score: Number
});

const foodItemSchema = new mongoose.Schema({
barcode: { type: String, required: true, unique: true },
name: { type: String, required: true },
brand: { type: String, required: true },
ingredients: [String],
additives: [String],
processedScore: { type: Number, required: true }
});

const recentFoodItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodItems: [{
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
  scannedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
^^^^^^^^^^
Whenever a user scans an item, add it to the foodItems array in their RecentFoodItem document.
You can limit the number of items in the foodItems array to ensure the document doesn't grow indefinitely (e.g., keep only the last 50 scanned items).
When the user wants to see their recent scans, you retrieve the RecentFoodItem document for that user.

Create a diary day:
When a user adds a first food for a day we create a diary day doc and add that food to it. If a user tries to add food again same day, we update the document with new food but dont create new one of course. (fetch for diary food that day, if no food then create)

GET 5 weeks of their daily scores to use for weekly header:
return all diaryDay docs where the user has userId and the date is less than now and more than 5 weeks ago

Note:
Before adding the food to the user's diary, check if the FoodItem already exists in your database (based on the barcode).
If it doesn't exist, create a new FoodItem in your database with the data fetched from OpenFoodFacts and calculate its processed score based on your algorithm.
If it exists, you may opt to update it with the latest information from OpenFoodFacts or simply fetch the existing details from your database.
