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

const LogModal = forwardRef(({ onClose, metricType, date }, ref) => {
  const isWeight = metricType === "Weight";
  const [value, setValue] = useState(0);
  const [weightValue, setWeightValue] = useState('');
  const [weightUnit, setWeightUnit] = useState("imperial");
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
    onSuccess: () => {
      queryClient.invalidateQueries(["RecentMetric"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSave = () => {
    updateHealthMetricMutation.mutate({
      metric: metricType,
      date: date ? getAnyDateLocal(date) : getCurrentDateLocal(),
      metricValue: isWeight ? weightValue : value,
      unitOfMeasure: weightUnit === 'imperial' ? 'kg' : 'lbs'
    });
    ref.current.close();
    // ("Maybe add toast?");
  };

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      snapPoints={[390]}
      keyboardBlurBehavior="restore"
      // enableDynamicSizing={true}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView>
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", top: 14, right: 14, zIndex: 3000 }}
        >
          <ClearIcon size={28} />
        </Pressable>
        <BottomSheetView style={{ padding: 20, gap: 10 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.nearBlack,
            }}
          >
            {metricType}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: "#636566",
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
            <WeightInput weightUnit={weightUnit} setWeightUnit={setWeightUnit} value={weightValue} setValue={setWeightValue} bottomSheetBehaviour={true} />
          ) : (
            <HealthSlider metricType={metricType} value={value} setValue={setValue} />
          )}
        </BottomSheetView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Pressable
            onPress={handleSave}
            style={{
              width: "100%",
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              backgroundColor: COLOURS.darkGreen,
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
