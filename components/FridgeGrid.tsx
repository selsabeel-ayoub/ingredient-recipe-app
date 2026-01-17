import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { FridgeItem } from './FridgeItem'; 
import { AddButton } from './AddButton';
import { generateFridgeRecipe } from '../services/geminiService';

// Shape for the AI-generated recipe
interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
}

export default function FridgeGrid() {
  const [items, setItems] = useState(['Carrots', 'Milk', 'Apple', "Eggplant", "Soysauce", "Cocoa Powder"]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const removeItem = (itemToRemove: string) => {
    setItems(items.filter((food) => food !== itemToRemove));
  };

  const addItem = () => {
    setItems([...items, 'New Item']);
  };

  const handleGetRecipe = async () => {
    if (items.length === 0) {
      Alert.alert("Fridge Empty", "Add some ingredients first!");
      return;
    }

    setLoading(true);
    try {
      const data = await generateFridgeRecipe(items);
      
      if (data) {
        setRecipe(data);
        setModalVisible(true);
      } else {
        // This handles cases where the API returns null due to errors
        Alert.alert("Try Again", "The AI is a bit busy. Please wait 30 seconds and try again.");
      }
    } catch (err) {
      Alert.alert("Error", "Could not connect to the recipe service.");
    } finally {
      setLoading(false);
    }
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
          <FridgeItem name={item} onRemove={() => removeItem(item)} />
        )}
      />

      {/* Button to trigger Gemini AI */}
      <TouchableOpacity 
        style={[styles.recipeButton, loading && styles.disabledButton]} 
        onPress={handleGetRecipe}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.recipeButtonText}>Generate Recipe</Text>
        )}
      </TouchableOpacity>

      <AddButton onPress={addItem} />

      {/* Recipe Display Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.recipeTitle}>{recipe?.name}</Text>
            
            <Text style={styles.sectionHeader}>Ingredients:</Text>
            {recipe?.ingredients.map((ing, i) => (
              <Text key={i} style={styles.bodyText}>• {ing}</Text>
            ))}
            
            <Text style={styles.sectionHeader}>Instructions:</Text>
            <Text style={styles.bodyText}>{recipe?.instructions}</Text>
            
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  header: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  shelf: { 
    justifyContent: 'flex-start', 
    borderBottomWidth: 4, 
    borderBottomColor: '#333', 
    marginBottom: 20, 
  },
  recipeButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  disabledButton: { backgroundColor: '#a5d6a7' },
  recipeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  modalContent: { flex: 1, backgroundColor: '#fff', marginTop: 50 },
  scrollContainer: { padding: 30, paddingBottom: 60 },
  recipeTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#2E7D32' },
  sectionHeader: { fontSize: 22, fontWeight: 'bold', marginTop: 25, marginBottom: 10, color: '#333' },
  bodyText: { fontSize: 17, lineHeight: 26, color: '#444', marginBottom: 5 },
  closeButton: { 
    marginTop: 40, 
    padding: 18, 
    backgroundColor: '#333', 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});