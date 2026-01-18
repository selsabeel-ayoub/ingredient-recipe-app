import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles as styles } from "../styles/theme";

export default function AddIngredient() {
  const router = useRouter();
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  
  const handleSave = () => {
    if (!ingredientName.trim()) {
      Alert.alert("Error", "Please enter an ingredient name");
      return;
    }
    
    // Combine name and quantity if provided
    const fullIngredient = quantity.trim() 
      ? `${ingredientName.trim()} (${quantity.trim()})`
      : ingredientName.trim();
    
    // Navigate back with the new ingredient as a query parameter
    router.push({
      pathname: '/',
      params: { newIngredient: fullIngredient }
    });
  };
  
  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Add New Ingredient</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter ingredient name"
        placeholderTextColor="#E8B4B4"
        value={ingredientName}
        onChangeText={setIngredientName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        placeholderTextColor="#E8B4B4"
        value={quantity}
        onChangeText={setQuantity}
      />
      
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Add notes (optional)"
        placeholderTextColor="#E8B4B4"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Ingredient</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}