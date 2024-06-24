import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { removeUserAccount } from "../axiosAPI/userAPI";
import Toast from "react-native-toast-message";
import { storage } from "../utils/MMKVStorage";

export const useEmailAuth = (password) => {
  const removeUserMutation = useMutation({
    mutationFn: removeUserAccount,
    onError: (err) => {
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to delete account, please try again later",
      });
    },
  });

  const handleEmailAccountDeletion = async () => {
    const user = auth().currentUser;
    if (!user) {
      auth().signOut();
      return; // Early return if no user
    }
    const email = user.email; // what if no user?
    const credential = auth.EmailAuthProvider.credential(email, password);

    Toast.show({
      text1: "Account Deleting...",
      autoHide: false,
    });

    try {
      const firebaseId = user.uid;

      await user.reauthenticateWithCredential(credential);

      // Backend relies on firebase session so must go before deletion
      removeUserMutation.mutate(
        { firebaseId },
        {
          onSuccess: async () => {
            await user.delete();
            storage.delete("firebaseToken");
            Toast.hide();
          },
        }
      );
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        Toast.show({
          type: "customErrorToast",
          text1: "Incorrect password, please try again.",
        });
      } else {
        Toast.show({
          type: "customErrorToast",
          text1: "Failed to delete account, please try again later",
        });
      }

      console.log(err, "Error deleting email account");
    }
  };

  return { handleEmailAccountDeletion };
};
