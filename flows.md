Food Items Fetch, Display and Add flows

1. Food detail page is opened via scan or food item selection
2. If barcode we fetchFoodWithBarcode, if singleFoodId we fetchFoodWithIvyId
3. Given the result from either cases we create a normalised data object for redux to use in the child foodDetail components
4. For example, when we add a food item to the diary, we send both the singleFoodId and the barcode as well as the other data needed for our mongoose Model
5. Our backend then differentates between the barcode or singleFoodId to handle the two cases.
6. These two cases are namely, adding the food item to consumedFoods field in the DiaryDay or the consumedSingleFoods field instead.
7. This is similar to grocery list functionality although in grocery list we have one groceries Field which holds a polymorphic association to both models


Note: On the frontend, we only control the adding to diaryList and groceryList from the foodDetails page (buttons), hence this is why it is where we use the big normalised data. And it is only normalised because the singleFoods and FoodItem have different structures



