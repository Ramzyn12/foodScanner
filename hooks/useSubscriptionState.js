import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { ENTITLEMENT_ID } from "../constants/rcConstants";

export const useSubscriptionState = () => {
  const [isSubscribed, setIsSubscribed] = useState(null);

  useEffect(() => {
    const getCustomerInfo = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        // console.log(JSON.stringify(customerInfo, null, 2), 'From hook');
        if (typeof customerInfo.entitlements?.active[ENTITLEMENT_ID] !== "undefined") {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (e) {
        // Need to handle error properly here!
        console.log(e);
        // setIsSubscribed(false);
      }
    };

    getCustomerInfo();
  }, []);

  return { isSubscribed };
};
