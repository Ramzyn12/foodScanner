// Add react-native-bottom-sheet

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fetchFoodWithBarcode } from "../axiosAPI/openFoodFactsAPI";

const ModalScreen = ({ route }) => {
  const barcode = route.params.barcodeId;

  const { data: foodFacts, isLoading } = useQuery({
    queryKey: ["FoodFacts", barcode],
    queryFn: () => fetchFoodWithBarcode(barcode),
  });

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Modal Content</Text>
          {/* Display your data here */}
          {isLoading && <Text style={styles.dataText}>Loading...</Text>}

          {/* Close Button */}
          <TouchableOpacity style={[styles.button, styles.buttonClose]}>
            <Text style={styles.textStyle}>
              {foodFacts && foodFacts.product.product_name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dataText: {
    marginBottom: 15,
    textAlign: "center",
    color: "grey",
  },
});

export default ModalScreen;
