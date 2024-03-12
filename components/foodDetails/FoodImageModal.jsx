import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Modal } from 'react-native';

const FoodImageModal = ({setModalVisible, modalVisible, image_url}) => {
  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: image_url
            }}
          />
        </SafeAreaView>
      </Modal>
  )
}

export default FoodImageModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  closeButton: { position: "absolute", top: 40, right: 20 },
  closeButtonText: { color: "white", fontSize: 18 },
  image: { width: "100%", height: "80%", resizeMode: "contain" }
})