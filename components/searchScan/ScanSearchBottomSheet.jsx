import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SearchBar } from "@rneui/themed";
import COLOURS from "../../constants/colours";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import FoodListItem from "../diary/FoodListItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RecentSearchList from "./RecentSearchList";
import SearchResultsList from "./SearchResultsList";
import Toast from "react-native-toast-message";
import SearchIcon from "../../svgs/SearchIcon";
import ClearIcon from "../../svgs/ClearIcon";
import { Button } from "@rneui/base";
// import SearchBar from "./SearchBar";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodWithSearchIvy } from "../../axiosAPI/searchSingleAPI";
import { fetchFoodWithSearch } from "../../axiosAPI/openFoodFactsAPI";
import NativeSearchBar from "./NativeSearchBar";
import LoadingSearchList from "./LoadingSearchList";
import NoResultsSearch from "./NoResultsSearch";

const ScanSearchBottomSheet = ({ setSheetIndex }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const inputRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const snapPoints = useMemo(() => ["20%", "50%", "90%"], []);
  const cancelButtonWidth = 55;
  const cancelBtnX = useSharedValue(-1 * cancelButtonWidth); // Start off-screen to the right
  const [search, setSearch] = useState("");
  const [triggerSearch, setTriggerSearch] = useState("");

  const { data: DataIvy, isLoading: isLoadingIvy, isError: isErrorIvy, error: errorIvy } = useQuery({
    queryKey: ["SearchIvy", triggerSearch],
    queryFn: () => fetchFoodWithSearchIvy(triggerSearch),
    retry: false,
    enabled: triggerSearch.trim().length > 2,
  });

  const { data: DataOFF, isLoading: isLoadingOFF, isError: isErrorOFF, error: errorOFF } = useQuery({
    queryKey: ["SearchOFF", triggerSearch],
    queryFn: () => fetchFoodWithSearch(triggerSearch),
    retry: false,
    enabled: triggerSearch.trim().length > 2,
  });

  const isLoading = isLoadingIvy || isLoadingOFF;
  const hideRecent = triggerSearch.trim().length > 2 || isLoading;
  const noResults = DataOFF?.length === 0 && DataIvy?.length === 0 && !isLoading

  const debounceSearch = useCallback(
    debounce((search) => {
      setTriggerSearch(search);
    }, 400),
    []
  );

  const updateSearch = (search) => {
    setSearch(search);
    debounceSearch(search);
  };

  const handleClearInput = () => {
    inputRef.current.clear();
    setSearch("");
    setTriggerSearch("");
  };

  const handleCancelPress = () => {
    inputRef.current.clear();
    setTriggerSearch("");
    setSearch("");
    Keyboard.dismiss();
    cancelBtnX.value = withTiming(-1 * cancelButtonWidth, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
  };

  const handleFocus = () => {
    bottomSheetRef.current.snapToIndex(2);
    cancelBtnX.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
  };

  const animatedCancelBtnStyle = useAnimatedStyle(() => {
    return {
      marginRight: cancelBtnX.value,
    };
  });


  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      onChange={(ind) => setSheetIndex(ind)}
      animateOnMount={!reducedMotion}
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      handleStyle={{ display: "none" }}
      style={styles.contentContainer}
    >
      {/* Top title and action */}
      <BottomSheetView style={styles.containerHeader}>
        <Text style={styles.searchText}>Search</Text>
        <Pressable
          onPress={() => navigation.navigate("MainTabsStack")} //Or go back
          style={styles.exitButtonContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Svg width="14" height="14" viewBox="0 0 8 8" fill="none">
            <Path
              d="M7.52985 0.967342C7.66715 0.830049 7.66715 0.607451 7.52985 0.470158C7.39256 0.332864 7.16996 0.332864 7.03267 0.470158L4.00001 3.50282L0.967342 0.470159C0.830049 0.332865 0.607451 0.332865 0.470158 0.470159C0.332864 0.607453 0.332864 0.83005 0.470158 0.967344L3.50282 4.00001L0.47017 7.03266C0.332877 7.16995 0.332877 7.39255 0.47017 7.52984C0.607464 7.66714 0.830061 7.66714 0.967355 7.52984L4.00001 4.49719L7.03266 7.52984C7.16995 7.66714 7.39255 7.66714 7.52984 7.52984C7.66714 7.39255 7.66714 7.16995 7.52984 7.03266L4.49719 4.00001L7.52985 0.967342Z"
              fill={COLOURS.tabUnselected}
            />
          </Svg>
        </Pressable>
      </BottomSheetView>

      {/* Search bar */}
      <NativeSearchBar
        animatedCancelBtnStyle={animatedCancelBtnStyle}
        onCancel={handleCancelPress}
        search={search}
        ref={inputRef}
        onClearInput={handleClearInput}
        onFocus={handleFocus}
        updateSearch={updateSearch}
      />

      {/* Search Results */}
      {isLoading && <LoadingSearchList />}
      {!isLoading && !hideRecent && <RecentSearchList />}
      {!isLoading && (DataOFF?.length > 0 || DataIvy?.length > 0) && (
        <SearchResultsList DataOFF={DataOFF} DataIvy={DataIvy} />
      )}
      {isErrorOFF && isErrorIvy && <Text>Error! Please try again later</Text>}
      {noResults && <NoResultsSearch />}
    </BottomSheet>
  );
};
 
export default ScanSearchBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 18,
  },
  searchText: { fontFamily: "Mulish_700Bold", fontSize: 28 },
  inputContainer: {
    backgroundColor: "#EEEEF0",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 40,
    gap: 8,
    borderRadius: 12,
    marginVertical: 20,
  },
  searchContainerStyle: {
    borderWidth: 0,
    backgroundColor: "white",
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 15,
    borderWidth: 0,
  },
  searchInputStyle: {
    backgroundColor: "#EEEEF0",
    // paddingRight: 7,
    borderWidth: 0,
  },
  searchInputContainerStyle: {
    backgroundColor: "#EEEEF0",
    height: 40,
    flex: 1,
    // overflow: 'hidden',
    marginLeft: 0,
    borderWidth: 0,
  },
  exitButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 40,
    backgroundColor: "#E9E9EB", //One off colour
    alignItems: "center",
    justifyContent: "center",
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  foodListContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOURS.lightGray,
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
  recentText: { fontSize: 16, paddingBottom: 10, fontFamily: "Mulish_700Bold" },
});
