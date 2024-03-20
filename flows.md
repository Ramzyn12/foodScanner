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

1. When someone first joins theres no diary day documents for them so for the get diary day (by date) endpoint we just return a 'fake' diary day document, other wise we would have to create one everytime they click on a different day.
2. For the get all diary days endpoint, we get all the diary days then if there arent 
any we create a real one and send that to the frontend who creates weeks surrounding each of the diary day dates and if any day has no diary day its rendered as a "none" day.
3. problem is, if we create a diary day and dont add anything, 


List item is rendered when:
1. Groceries list item
2. Diary list item
3. Search results list
4. Recents results list
This all comes from the FoodItem and singleFood models in mongoDB so we could just add a processedState when we addFoodToDiary or addFoodToGroceryList (since this is when we add it to our database)
