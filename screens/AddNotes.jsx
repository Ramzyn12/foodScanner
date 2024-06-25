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
  findNodeHandle,
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
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../utils/MMKVStorage";
import ErrorPage from "./ErrorPage";

const AddNotes = ({ route }) => {
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState(""); // State to hold the notes text
  const date = route.params.date;
  const day = route.params.day;
  const notesInputRef = useRef(null); // Create a ref for the TextInput
  const queryClient = useQueryClient();
  const { theme } = useColourTheme();
  const keyboardViewRef = useRef(null); // Create a ref for the TextInput
  const userId = auth().currentUser?.uid;
  const [initialNotes, setInitialNotes] = useState(""); // State to hold the initial notes
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);

  console.log(date);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["Note", date],
    queryFn: () => getNote({ date: getAnyDateLocal(date) }),
    retry: false,
    enabled: false, // then  Could retry if couldnt get from async storage?
  });

  const getDataFromBackend = async (timer) => {
    const backendData = await refetch();
    if (backendData.data && backendData.data.note) {
      setNotes(backendData.data.note);
      setInitialNotes(backendData.data.note);

      // Save the fetched notes to AsyncStorage
      storage.set(`${userId}_${date}`, backendData.data.note);
    } else {
      storage.set(`${userId}_${date}`, "");

      timer = setTimeout(() => {
        notesInputRef.current?.focus();
      }, 400);
    }
  };

  useEffect(() => {
    let timer;

    const fetchLocalNotes = async () => {
      // Do we need await before the getDataFromBackend function?
      try {
        const localNotes = storage.getString(`${userId}_${date}`);
        if (localNotes !== undefined) {
          setNotes(localNotes);
          setInitialNotes(localNotes);
        } else {
          // Fallback to fetching from backend if no local data yet
          getDataFromBackend(timer);
        }
      } catch (e) {
        console.log("Failed to fetch notes from AsyncStorage", e);
        // Fallback to fetching from backend in case of error
        getDataFromBackend(timer);
      } finally {
        setIsLoadingLocal(false);
      }
    };

    fetchLocalNotes();

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Note", date] });

      setInitialNotes(notes);
      // queryClient.setQueryData(["Note", date], { note: notes });
    },
    onError: (err) => {
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to save note, please try again later",
      });

      // Revert to previous note if error
      setNotes(initialNotes);
    },
  });

  const handleSaveNotes = async () => {
    if (notes !== initialNotes) {
      // Notes have changed so we can save to db and storage
      updateNoteMutation.mutate({ note: notes, date });
      storage.set(`${userId}_${date}`, notes);
    }

    notesInputRef.current?.blur();
  };

  if (isLoading || isLoadingLocal) return <ActivityIndicator />; // NEED BETTER LOADING HERE?
  if (isError)
    return (
     <ErrorPage message={'There appears to have been an error whilst fetching your notes. Please try again later.'} onPress={() => refetch()} />
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
        ref={keyboardViewRef}
        viewIsInsideTabBar={true}
        directionalLockEnabled={true}
        enableResetScrollToCoords={false}
      >
        <TextInput
          ref={notesInputRef}
          autoCorrect={false}
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
