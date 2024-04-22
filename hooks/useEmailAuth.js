
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { removeUserAccount } from "../axiosAPI/userAPI";
import Toast from "react-native-toast-message";
import { storage } from "../utils/MMKVStorage";

export const useEmailAuth = (password) => {

  const removeUserMutation = useMutation({
    mutationFn: removeUserAccount,
    onSuccess: () => {
      console.log("successfully removed accounts");
    },
    onError: (err) => {
      console.log(err, "Error removing user from mongoDB");
    },
  });

  const handleEmailAccountDeletion = async () => {
    const user = auth().currentUser
    const email = user.email
    const credential = auth.EmailAuthProvider.credential(email, password)

    Toast.show({
      text1: "Account Deleting...",
      autoHide: false,
    });

    try {
      const firebaseId = user.uid;

      await user.reauthenticateWithCredential(credential)

      // Backend relies on firebase session so must go before deletion
      removeUserMutation.mutate({ firebaseId });

      await user.delete()
      
      // await AsyncStorage.removeItem("firebaseToken");
      storage.delete('firebaseToken')

      Toast.hide()

    } catch (err) {
      Toast.show({
        text1: "An error occurred",
        text2: "Try different password",
        type: "error",
      });
      console.log(err, 'Error deleting email account');
    }

  }
  


  return { handleEmailAccountDeletion };
};
