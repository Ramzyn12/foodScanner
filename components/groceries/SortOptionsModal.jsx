import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { sortByProcessedScore } from '../../redux/grocerySlice'
import COLOURS from '../../constants/colours'

const SortOptionsModal = ({onPress}) => {
  const dispatch = useDispatch()

  const handleSortProcessedScore = () => {
    dispatch(sortByProcessedScore())
  }
  
  return (
    <Pressable onPress={onPress} style={styles.modalOverlay}>
        <View style={{position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%'}}>
          <Pressable onPress={() =>  console.log('sort pressed')} style={{padding: 15, borderWidth: 1}}>
            <Text>Manual</Text>
          </Pressable>
          <Pressable onPress={handleSortProcessedScore} style={{padding: 15, borderWidth: 1}}>
            <Text>ProcessedScore</Text>
          </Pressable>
          <Pressable onPress={() =>  console.log('sort pressed')} style={{padding: 15, borderWidth: 1}}>
            <Text>Manual</Text>
          </Pressable>
        </View>
      </Pressable>
  )
}

export default SortOptionsModal

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.8,
    backgroundColor: COLOURS.lightGray,
  },
});