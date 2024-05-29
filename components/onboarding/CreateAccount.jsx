import {
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { G, Svg } from "react-native-svg";
import ClearIcon from "../../svgs/ClearIcon";
import NameInput from "./NameInput";
import FormSubmissionButton from "./FormSubmissionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { addFirstLastName } from "../../axiosAPI/authAPI";
import { addUserNames } from "../../axiosAPI/userAPI";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";


const CreateAccount = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const {theme} = useColourTheme()
  // const token = route?.params?.token;
  // const firebaseId = route?.params?.firebaseId;

  const addNamesMutation = useMutation({
    mutationFn: addUserNames,
    onSuccess: async () => {
      navigation.goBack();
      queryClient.invalidateQueries({ queryKey: ["UserNames"] });
      const user = auth().currentUser;
      if (user) {
        user.updateProfile({ displayName: firstName || lastName }).then(() => {
          console.log("Success updating display name");
        });
      }
    },
    onError: (err) => {
      navigation.goBack();
      Toast.show({
        type: 'customErrorToast',
        text1: 'Failed to add names, please try again later'
      })
    },
  });

  const handleFinaliseAccount = async () => {
    addNamesMutation.mutate({ firstName, lastName });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={[styles.container, {backgroundColor: themedColours.primaryBackground[theme]}]}>
      <View style={{ gap: 12 }}>
        <View style={styles.topContainer}>
          <Text style={[styles.titleText, {color: themedColours.primaryText[theme]}]}>Finish creating your account</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <ClearIcon background={themedColours.secondaryBackground[theme]} crossColor={themedColours.secondaryText[theme]} size={28} />
          </Pressable>
        </View>
        <NameInput
          name={firstName}
          text={"First name"}
          setName={setFirstName}
        />
        <NameInput name={lastName} text={"Last name"} setName={setLastName} />
      </View>
      <View style={{ paddingBottom: 40 }}>
        <FormSubmissionButton
          onPress={handleFinaliseAccount}
          firstName={firstName}
          lastName={lastName}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "space-between" },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleText: { fontSize: 28, fontFamily: "Mulish_700Bold" },
});
