import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { FridgeItem } from './FridgeItem'; 
import { AddButton } from './AddButton';
import { RecipeModal } from './RecipeModal'; // New Import
import { generateFridgeRecipe } from '../services/geminiService';

export default function FridgeGrid() {
  const [items, setItems] = useState(['Carrots', 'Milk', 'Apple', "Eggplant", "Soysauce", "Cocoa Powder"]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeItem = (name: string) => setItems(prev => prev.filter(i => i !== name));
  const addItem = () => setItems(prev => [...prev, 'New Item']);

  const handleGetRecipe = async () => {
    if (!items.length) return Alert.alert("Fridge Empty", "Add ingredients first!");

    setLoading(true);
    const data = await generateFridgeRecipe(items);
    setLoading(false);

    if (data) setRecipe(data);
    else Alert.alert("Try Again", "The AI is busy. Please wait 30 seconds.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fridge</Text>
      
      <FlatList
        data={items}
        numColumns={3}
        columnWrapperStyle={styles.shelf}
        renderItem={({ item }) => <FridgeItem name={item} onRemove={() => removeItem(item)} />}
      />

      <TouchableOpacity 
        style={[styles.recipeButton, loading && { backgroundColor: '#a5d6a7' }]} 
        onPress={handleGetRecipe}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.recipeButtonText}>Generate Recipe</Text>}
      </TouchableOpacity>

      <AddButton onPress={addItem} />

      <RecipeModal 
        visible={!!recipe} 
        recipe={recipe} 
        onClose={() => setRecipe(null)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  header: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  shelf: { justifyContent: 'flex-start', borderBottomWidth: 4, borderBottomColor: '#333', marginBottom: 20 },
  recipeButton: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 12, alignItems: 'center', marginVertical: 15 },
  recipeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});