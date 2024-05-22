import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OverviewHeader from "../components/WeeklyOverview/OverviewHeader";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNote, updateNote } from "../axiosAPI/noteAPI";
import { getAnyDateLocal } from "../utils/dateHelpers";
import Toast from "react-native-toast-message";

const AddNotes = ({ route }) => {
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState(""); // State to hold the notes text
  const date = route.params.date;
  const day = route.params.day;
  const notesInputRef = useRef(null); // Create a ref for the TextInput
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["Note", date],
    queryFn: () => getNote({ date: getAnyDateLocal(date) }),
    retry: false,
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Note", date] });
      // keep this toast or change it?
      Toast.show({
        type: "success",
        text1: "Note saved!",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to save note, please try again later",
      });
      if (data.note) setNotes(data.note);
      // Need to show toast, and try go back to previous note?
      //or just say try again later
    },
  });

  // Need to improve this massively, logic is a bit weird
  useEffect(() => {
    let timer;
    if (isSuccess && data && data.note) {
      setNotes(data.note); // If there's existing note data, fill it in
    } else if (notes === "") {
      // notesInputRef.current?.blur();
      timer = setTimeout(() => {
        notesInputRef.current?.focus();
      }, 400);
    }

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [data, isSuccess, isError]);

  const handleSaveNotes = () => {
    updateNoteMutation.mutate({ note: notes, date });
    notesInputRef.current?.blur();
  };

  if (isLoading) return <ActivityIndicator />;
  if (isError)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error loading notes, please try again later</Text>
      </View>
    );

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <OverviewHeader
        notes={notes}
        day={day}
        title={"Notes"}
        onSave={handleSaveNotes}
      />
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        viewIsInsideTabBar={true}
        directionalLockEnabled={true}
        //   style={{flex: 1}}
        // contentContainerStyle={{flex: 1}}
      >
        <TextInput
          ref={notesInputRef}
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            borderRadius: 5,
            fontSize: 16,
          }}
          multiline
          scrollEnabled={false}
          placeholder="Enter your notes here..."
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top" // For better text alignment in multiline mode
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddNotes;
