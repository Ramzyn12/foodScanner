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

const LogModal = forwardRef(({ onClose }, ref) => {
  const [value, setValue] = useState(0);

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  }, []);

  const handleSave = () => {
    // console.log(value);
    ref.current.close();
    ("Maybe add toast?");
  };

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      snapPoints={[390]}
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
            Anxiety
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: "#636566",
            }}
          >
            How is your anxiety today?
          </Text>
        </BottomSheetView>
        <View style={{padding: 20, paddingBottom: 40, marginTop: 65}}>
          <HealthSlider value={value} setValue={setValue} />
        </View>
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
