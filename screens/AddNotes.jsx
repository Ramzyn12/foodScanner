import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OverviewHeader from "../components/WeeklyOverview/OverviewHeader";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNote, updateNote } from "../axiosAPI/noteAPI";
import { getAnyDateLocal } from "../utils/dateHelpers";

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
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    let timer;
    if (isSuccess && data && data.note) {
      setNotes(data.note); // If there's existing note data, fill it in
    } else if ((isError && !data) || notes === "") {
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

  // NEED to show cursor on focus straight away if no no tes
  // Save when press save but also save when exit the page

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
