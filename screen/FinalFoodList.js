import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FinalFoodList({ route }) {
  const { foodItems } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.FinalFoodListContainer}>
        <Text style={styles.title}>Final Food List</Text>
        <Text style={styles.foodItems}>{JSON.stringify(foodItems, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8E8E8',
  },
  FinalFoodListContainer:{
    marginTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  foodItems: {
    fontSize: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});

export default FinalFoodList;
