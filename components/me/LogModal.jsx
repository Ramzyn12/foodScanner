import { View, Text, Pressable } from "react-native";
import React, { forwardRef, useCallback, useRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ClearIcon from "../../svgs/ClearIcon";
import HealthSlider from "./HealthSlider";
import COLOURS from "../../constants/colours";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHealthMetric } from "../../axiosAPI/healthMetricAPI";
import WeightInput from "./WeightInput";
import { getAnyDateLocal, getCurrentDateLocal } from "../../utils/dateHelpers";
import Toast from "react-native-toast-message";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const LogModal = forwardRef(({ onClose, metricType, date }, ref) => {
  const isWeight = metricType === "Weight";
  const [value, setValue] = useState(0);
  const [weightValue, setWeightValue] = useState("");
  const [weightUnit, setWeightUnit] = useState("imperial");
  const {theme} = useColourTheme()
  const question =
    metricType === "Weight"
      ? `What's your weight today?`
      : metricType === "Energy"
      ? "How are your energy levels today?"
      : metricType === "Anxiety"
      ? "How is your anxiety today?"
      : "How well did you sleep last night?";
  const queryClient = useQueryClient();
  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
      {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }, []);

  const updateHealthMetricMutation = useMutation({
    mutationFn: updateHealthMetric,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["RecentMetric", variables.metric],
      });
      queryClient.invalidateQueries({ queryKey: ["TimelineWeek"] });
    },
    onError: (err) => {
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to update value, please try again later",
      });
    },
  });

  const handleSaveValue = () => {
    updateHealthMetricMutation.mutate({
      metric: metricType,
      date: date ? getAnyDateLocal(date) : getCurrentDateLocal(),
      metricValue: isWeight ? weightValue : value,
      unitOfMeasure: weightUnit === "imperial" ? "kg" : "lbs",
    });
    ref.current.close();
  };

  return (
    <BottomSheetModal
      ref={ref}
      backgroundStyle={{backgroundColor: themedColours.primaryBackground[theme]}}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      snapPoints={[390]}
      keyboardBlurBehavior="restore"
      // enableDynamicSizing={true}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView >
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", top: 14, right: 14, zIndex: 3000 }}
        >
          <ClearIcon crossColor={themedColours.secondaryText[theme]} background={themedColours.secondaryBackground[theme]} size={28} />
        </Pressable>
        <BottomSheetView style={{ padding: 20, gap: 10 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
            }}
          >
            {metricType}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: themedColours.secondaryText[theme],
            }}
          >
            {question}
          </Text>
        </BottomSheetView>
        <BottomSheetView
          style={{
            padding: 20,
            paddingBottom: 40,
            marginTop: isWeight ? 20 : 65,
          }}
        >
          {isWeight ? (
            <WeightInput
              weightUnit={weightUnit}
              setWeightUnit={setWeightUnit}
              value={weightValue}
              setValue={setWeightValue}
              bottomSheetBehaviour={true}
            />
          ) : (
            <HealthSlider
              metricType={metricType}
              value={value}
              setValue={setValue}
            />
          )}
        </BottomSheetView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Pressable
            onPress={handleSaveValue}
            style={{
              width: "100%",
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              backgroundColor: themedColours.primary[theme],
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Mulish_700Bold",
                color: "#F7F6EF",
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default LogModal;
