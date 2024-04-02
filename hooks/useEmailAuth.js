
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { removeUserAccount } from "../axiosAPI/userAPI";

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

    try {
      const firebaseId = user.uid;

      await user.reauthenticateWithCredential(credential)

      // Backend relies on firebase session so must go before deletion
      removeUserMutation.mutate({ firebaseId });

      // Handle situation where mongo success but firebase deletion fails? 
      await user.delete()
      
      await AsyncStorage.removeItem("firebaseToken");

      console.log('SUCCESS');

    } catch (err) {
      console.log(err);
    }
  }
  


  return { handleEmailAccountDeletion };
};
