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


DATES!
1. So mongoDB stores dates in UTC which is universal and doesn't change with daylight savings.
2. When creating the first diary day date on register, we would store the actual date object new Date() - [Tue Apr 23 2024 13:17:55 GMT+0100 (British Summer Time)] - and mongoDB will convert this to UTC.
3. Note that the startOfDay() gives the local time not in UTC, then when converted will be in britain 2024-04-22T23:00:00.000+00:00 after BST or 2024-04-16T00:00:00.000+00:00 before BST (British Summer Time)
4. When we query for dates we will send in the local time dates and the timezone for example 2024-04-16 and Europe/london, then on the backend we will first convert this to UTC (So it matches the format in mongoDB) and then query by gte or lte the start of day like this:

// Assuming 'date' is '2024-04-16' and 'timeZone' is 'Europe/London'

// 1. Parse the date in the context of the given time zone ('Europe/London')
const startOfLocalDay = moment.tz(date, timeZone)
  .startOf('day') // 2. Get the start of the day in the local time zone ('2024-04-16T00:00:00' in BST)
  .utc()          // 3. Convert that time to UTC ('2024-04-15T23:00:00Z' during BST)
  .toDate();      // Convert the moment object to a JavaScript Date object

// Similar process for the end of the day
const endOfLocalDay = moment.tz(date, timeZone)
  .endOf('day')   // Get the end of the day in the local time zone ('2024-04-16T23:59:59' in BST)
  .utc()          // Convert that time to UTC ('2024-04-16T22:59:59Z' during BST)
  .toDate();

// MongoDB query to find documents where the date field is within the start and end of the day in UTC
return db.collection('diaries').find({
  date: {
    $gte: startOfLocalDay,
    $lt: endOfLocalDay
  }
}).toArray();

5. So just to make it clear, if we were in new york and created out first diary day on Tue Apr 23 2024 22:17:55  (10pm), then when converted to UTC it will be 2024-04-24T02:17:55.000Z which seems wierd becuase its gone on to the next day!? however its fine becuase when you query using gte start of day and lte end of day you get 2024-04-23T04:00:00.000Z to 2024-04-24T04:00:00.000Z so it will be included!

Files and things we need to change:
In General we use dates when creating, updating and querying for diaryDays, including adding foods to certain dates. Also for the timeline we use the dates for displaying each of the days one has had the app downloaded for and also for notes and updating notes. Finally we use it on the me page as well as the accordains to log healthMetrics to certain dates and then we query for those partiuclar dates to display.


HERES THE PLAN/ PROBLEM WITH THE DATES

We have made it so that from the frontend our backend recives dates like 2024-04-04,
and then on the backend what we want to do (but cant yet) is to count that as midnight LOCAL TIME. so 2024-04-24T00:00:00 and then we want to convert this into a utc time which will either be 2024-04-23T23:00:00.000Z in DST or 2024-04-24T00:00:00.000Z in Standard time. We would then query for the date in databse between the utc days at start of day 2024-04-23T23:00:00.000Z and the end of day 2024-04-24T22:59:59.999Z.
This works fine until its no longer daylight savings. Becuase then its 2024-04-24T00:00:00.000Z as the utc start of day and hence 2024-04-23T23:00:00.000Z which is in our databse is no longer accessible? 

PROPOSED SOLUTION:

Store all the dates on the backend as close to just the day as you can, for example best case scenario is just 2024-04-04 however if this doesnt work for mongoDB then try 2024-04-04T00:00:000Z or noon. Just consider the different options. This means that no matter where someone is in the world, if its april 24th we simply just store THEIR local time, so for jeff in brazil its 2024-04-04 and molly in italy its 2024-04-03, and so thats what we store in our database for each of them, we need to be able to get their local date of course. 
Look at https://www.mongodb.com/docs/manual/reference/method/Date/ and https://stackoverflow.com/questions/2532729/daylight-saving-time-and-time-zone-best-practices


IN APP PURCHASES FLOW

1. When app loads in App.js we configure the Purchases object with a custom app id, (to use in webhooks).
2. When a user tries to use a paid feature we show them the paywall with options, they can then purchases the subscription and this will then update their customer info
3. In MainComponent.js we have a listener for when customerInfo changes, these changes will then trigger a dispatch to redux where if they cancel then we can send them notification or somin, just realised that a cancel shouldn't stop the access in 
app. I THINK THIS ISNT NEEDED THO SINCE POINT 4 IS SUFFICIENT
4. we also have a Purhcases.customerInfo subscription status which could be called on each component to decide their subscription status? Could do it on each focus rather than mount? 
5. We then use webhooks when subscription changes for reasons such as: for things like sending emails to say sorry your going when they unsubscribe or vice versa. Some people maintain documents of subscriptions or purchases but not sure we will. They say to call the REST API whenever someone uses webhook because different webhook events have different structures but rest api has same structure so easier to store in DB. The different webhook flows are simple if you read them.


OR if you feel we need to use the listner then maybe set it up like this:
1. Fetch Initial Subscription Status: When your app or specific component mounts, immediately call getCustomerInfo() to fetch the current state of the user's subscriptions. This method will provide you with the necessary data to initialize your app's UI correctly.
2. Set Up Listener for Updates: After fetching the initial data, set up addCustomerInfoUpdateListener to listen for any changes in subscription status. This ensures that your app reacts to updates in real-time after the initial load.

useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const info = await Purchases.getCustomerInfo();
        if (info.entitlements.active.pro) {
          setIsProUser(true);
        } else {
          setIsProUser(false);
        }
      } catch (error) {
        console.error("Failed to fetch purchaser info:", error);
      }
    };

    fetchSubscriptionInfo();

    const listener = Purchases.addCustomerInfoUpdateListener((info) => {
      if (info.entitlements.active.pro) {
        setIsProUser(true);
      } else {
        setIsProUser(false);
      }
    });

    return () => listener.remove();
  }, []);

