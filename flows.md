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

UpdateHealthMetric - Updates or logs specific health metric on certain date
GetRecentMetrics - Gets the most recent data for a metric
GetAllDataForMetric - gets all the data for a specific health metric

For each card on me page just get the latest document
For the graphs just use the amount of days as the time frame chosen from dropdown


TimelineWeek

For the diary page we will use the timeline week controller to find out the date since the first diary document and use that to figure out what week of the timeline were on and send that data to the diary page to display it. It may send something like day, title, subtitle.

For the Health screen we would need to have a get all weeks timeline controller which would send all the timelineWeek documents and some way to know how many days we've completed so we can fill in the green line, maybe like
{
  totalDays: 18,
  weeks: [
    {week: 1,
    ...}
  ]
}

For the WeeklyOverview page we would need to grab the specific timelineWeek document using the week, then based on that we need to find out the dates of the week. Then for each date we need to get their diaryDay to see if they ate processed food, their HealthMetric documents to see if they logged stuff etc.. and their notes. For the success, fail, pending or empty, base it on the document or if no docuemnt then its a fail? Or if its the date of today then its pending or if its later then its empty string

--- 
Get the first diary day, add however many weeks then this is the first date of the week
Then create an array of the first date and then 6 more adding one day using date-fns
then for each query we will cehck the docuemtns where the date is in that array
So first we need All the diary days, then we need all the HealthMetrics grouped by the date, then we worry bout notes later 
