import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  Pressable,
  PanResponder,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OverviewHeader from "../components/WeeklyOverview/OverviewHeader";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNote, updateNote } from "../axiosAPI/noteAPI";
import { getAnyDateLocal } from "../utils/dateHelpers";
import Toast from "react-native-toast-message";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const AddNotes = ({ route }) => {
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState(""); // State to hold the notes text
  const date = route.params.date;
  const day = route.params.day;
  const notesInputRef = useRef(null); // Create a ref for the TextInput
  const queryClient = useQueryClient();
  const { theme } = useColourTheme();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Note", date],
    queryFn: () => getNote({ date: getAnyDateLocal(date) }),
    retry: false,
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Note", date] });

      // queryClient.setQueryData(["Note", date], { note: notes });
    },
    onError: (err) => {
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to save note, please try again later",
      });

      // Revert to previous note if error
      if (data.note) setNotes(data.note);
    },
  });

  // Need to improve this massively, logic is a bit weird
  useEffect(() => {
    let timer;

    if (data && data.note) {
      // If note available set to state
      setNotes(data.note);
    } else {
      // Notes empty so focus after timer
      timer = setTimeout(() => {
        notesInputRef.current?.focus();
      }, 400);
    }

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [data, isError]);

  const handleSaveNotes = () => {
    if (notes !== data.note) {
      // Notes have changed so we can save
      updateNoteMutation.mutate({ note: notes, date });
    }

    notesInputRef.current?.blur();
  };

  const handleSelectionFocus = (e) => {
    if (notesInputRef.current) {
      const { start } = e.nativeEvent.selection
      notesInputRef.current.setNativeProps({
        selection: { start: start, end: start },
      });
    }
  };

  if (isLoading) return <ActivityIndicator />; // NEED BETTER LOADING HERE?
  if (isError)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error loading notes, please try again later</Text>
      </View>
    );

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
      }}
    >
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
        enableResetScrollToCoords={false}
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
            color: themedColours.primaryText[theme],
          }}
          multiline
          scrollEnabled={false}
          placeholder="Enter your notes here..."
          hitSlop={400}
          rejectResponderTermination={false}
          value={notes}
          onSelectionChange={(event) => handleSelectionFocus(event)}
          selectTextOnFocus={false}
          placeholderTextColor={themedColours.secondaryText[theme]}
          onChangeText={setNotes}
          textAlignVertical="top" // For better text alignment in multiline mode
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddNotes;
