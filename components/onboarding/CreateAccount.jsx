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

const CreateAccount = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const token = route?.params?.token;
  const firebaseId = route?.params?.firebaseId;

  const addNamesMutation = useMutation({
    mutationFn: addFirstLastName,
    onSuccess: async () => {
      navigation.goBack();
      if (token) {
        await AsyncStorage.setItem("firebaseToken", token);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFinaliseAccount = async () => {
    addNamesMutation.mutate({ firebaseId, firstName, lastName });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={{ gap: 12 }}>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Finish creating your account</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <ClearIcon size={28} />
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
