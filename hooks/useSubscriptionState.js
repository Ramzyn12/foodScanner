import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

export const useSubscriptionState = () => {
  const [isSubscribed, setIsSubscribed] = useState(null);

  useEffect(() => {
    const getCustomerInfo = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        // console.log(JSON.stringify(customerInfo, null, 2), 'From hook');
        if (typeof customerInfo.entitlements?.active["Pro"] !== "undefined") {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (e) {
        console.log(e);
        // setIsSubscribed(false);
      }
    };

    getCustomerInfo();
  }, []);

  return { isSubscribed };
};
