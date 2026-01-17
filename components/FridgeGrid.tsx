import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FridgeItem } from './FridgeItem'; // Import the pieces
import { AddButton } from './AddButton';

export default function FridgeGrid() {
  const [items, setItems] = useState(['Carrots', 'Milk', 'Apple']);

  const removeItem = (itemToRemove: string) => {
    setItems(items.filter((food) => food !== itemToRemove));
  };

  const addItem = () => {
    // Placeholder logic for adding a new item
    setItems([...items, 'New Item']);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fridge</Text>
      
      <FlatList
        data={items}
        numColumns={3}
        columnWrapperStyle={styles.shelf}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <FridgeItem 
            name={item} 
            onRemove={() => removeItem(item)} 
          />
        )}
      />

      <AddButton onPress={addItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  shelf: { 
    justifyContent: 'flex-start', 
    borderBottomWidth: 4, 
    borderBottomColor: '#333', 
    marginBottom: 20, 
  },
});