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

WHEN UPDATING GROCERY LIST ORDER WE ADD THE FOODITEM ID NOT THE
GROCERYLIST ITEM ID

Note:
Before adding the food to the user's diary, check if the FoodItem already exists in your database (based on the barcode).
If it doesn't exist, create a new FoodItem in your database with the data fetched from OpenFoodFacts and calculate its processed score based on your algorithm.
If it exists, you may opt to update it with the latest information from OpenFoodFacts or simply fetch the existing details from your database.

Some tips: 
Local First, Sync Later
Implement a "local-first" approach where changes are first made locally and then synchronized with the backend at opportune moments. This could be:
When the user explicitly chooses to sync (e.g., through a refresh action).
Automatically, in the background, at regular intervals.
When detecting that the network status changes to online.
1. Combine Backend Calls
If possible, try to combine the diary and grocery list checks into a single backend call. This would involve creating a new endpoint or modifying an existing one that, given a barcode and user ID, checks both the diary and grocery list for the presence of the item and returns this information alongside the food details from Open Food Facts.
2. Use Caching
Server-side Caching: Implement caching for frequently requested data. For example, food item details fetched from Open Food Facts could be cached on your server for a short period. This reduces the need to fetch the same data from Open Food Facts upon every request.
Client-side Caching: Utilize client-side caching strategies to store previously fetched data. If a user scans a barcode that has already been scanned recently, you can serve the data from the cache rather than making all the API calls again.
3. Lazy Loading
Consider whether all the information is needed immediately upon scanning. If not, you could initially fetch only the essential details from Open Food Facts and then lazily load the consumption and grocery list status either on user request or as part of a subsequent background process.


TO combine api calls:

const fetchFoodDetailsAndStatus = async (req, res) => {
  const { barcode } = req.params;
  const user = req.user._id;

  // Fetch food details from Open Food Facts
  const foodDetails = await fetchFoodDetailsFromOpenFoodFacts(barcode);

  // Combine checks for diary and grocery list into a single operation
  const [isConsumedToday, isOnGroceryList] = await Promise.all([
    checkIfConsumedToday(user, barcode),
    checkIfOnGroceryList(user, barcode),
  ]);

  // Return combined response
  res.json({
    ...foodDetails,
    isConsumedToday,
    isOnGroceryList,
  });
};