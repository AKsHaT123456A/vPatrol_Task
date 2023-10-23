import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import Draggable from 'react-native-draggable';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

function MainScreen({ navigation }) {
  const [foodItems, setFoodItems] = useState([]);
  const [draggableFoodItems, setDraggableFoodItems] = useState([]); // Draggable copies
  const [editItem, setEditItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newFoodItem, setNewFoodItem] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEditFoodItem = (index) => {
    setEditItem(index);
    setNewFoodItem(foodItems[index].foodItem);
    setNewPrice(foodItems[index].price.toString());
    toggleModal();
  };

  const handleDeleteFoodItem = (index) => {
    const updatedItems = [...foodItems];
    updatedItems.splice(index, 1);
    setFoodItems(updatedItems);
  };

  const handleFinalList = () => {
    if (foodItems.length === 0) {
      Alert.alert('Validation Error', 'Please add at least one food item.');
      return;
    }
    navigation.navigate('FinalFoodList', { foodItems });
  };

  const handleAddFoodItem = () => {
    if (!newFoodItem.trim()) {
      Alert.alert('Validation Error', 'Please enter a valid food item.');
      return;
    }

    if (isNaN(parseFloat(newPrice))) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return;
    }

    if (editItem !== null) {
      const updatedItems = [...foodItems];
      updatedItems[editItem] = { foodItem: newFoodItem, price: parseFloat(newPrice) };
      setFoodItems(updatedItems);
      setEditItem(null);
    } else {
      setFoodItems([...foodItems, { foodItem: newFoodItem, price: parseFloat(newPrice) }]);
    }

    setNewFoodItem('');
    setNewPrice('');
    toggleModal();
  };

  const handleDraggedItem = (item) => {
    setDraggableFoodItems([...draggableFoodItems, item]); // Add a copy of the item to the draggable list
  };

  return (
    <View style={styles.container}>
      <View style={styles.headListContainer}>
        {foodItems.length === 0 && <Text style={styles.noItemsText}>No Food Item Added Yet!!!</Text>}

        <FlatList
          data={foodItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.foodItem}>
              <View style={styles.itemInfo}>
                <View style={styles.iconContainer}>
                  <Icon name="cutlery" size={20} color="blue" style={styles.icon} />
                  <Text style={styles.itemText}>Food Item: {item.foodItem}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon name="dollar" size={20} color="green" style={styles.icon} />
                  <Text style={styles.itemText}>Price: ₹{item.price}</Text>
                </View>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => handleEditFoodItem(index)}>
                  <Icon name="edit" size={20} color="blue" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteFoodItem(index)}>
                  <Icon name="trash" size={20} color="red" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <TouchableOpacity style={styles.addFoodButton} onPress={toggleModal}>
          <Text style={styles.buttonTextAdd}>+ Add Food Item</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600}
        animationOutTiming={1200}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Icon name="close" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {editItem !== null ? 'Edit Food Item' : 'Add Food Item'}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food Item:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter food item"
              value={newFoodItem}
              onChangeText={(text) => setNewFoodItem(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food Price:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter food price"
              value={newPrice}
              onChangeText={(text) => setNewPrice(text)}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.foodButton} onPress={handleAddFoodItem}>
            <Text style={styles.buttonText}>Add Food Item</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.finalListButtonContainer} onPress={handleFinalList}>
        <Text style={styles.buttonText}>Final Food List</Text>
      </TouchableOpacity>
      {draggableFoodItems.map((item, index) => (
        <Draggable
          key={index}
          onPressOut={() => setDraggableFoodItems((items) => items.filter((_, i) => i !== index))}
        >
          <View style={styles.foodItem}>
            <View style={styles.itemInfo}>
              <View style={styles.iconContainer}>
                <Icon name="cutlery" size={20} color="blue" style={styles.icon} />
                <Text style={styles.itemText}>Food Item: {item.foodItem}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon name="dollar" size={20} color="green" style={styles.icon} />
                <Text style={styles.itemText}>Price: ₹{item.price}</Text>
              </View>
            </View>
          </View>
        </Draggable>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8E8E8',
  },
  headListContainer: {
    marginTop: 50,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  noItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  itemText: {
    fontSize: 16,
  },
  foodButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  finalListButtonContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    borderRadius: 5,
    padding: 3,
    fontWeight: 'bold',
  },
  buttonTextAdd: {
    color: 'black',
    fontSize: 16,
    borderRadius: 5,
    padding: 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    color: 'blue',
    marginHorizontal: 10,
  },
  addFoodButton: {
    backgroundColor: 'rgba(69, 190, 66, 0.4)',
    borderWidth: 2,
    borderColor: 'rgba(69, 190, 66, 1)',
    display: 'flex',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonAdd: {
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: 350,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});

export default MainScreen;
