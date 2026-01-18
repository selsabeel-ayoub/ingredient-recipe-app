import { useState } from 'react';
import { Alert } from 'react-native';
import { generateFridgeRecipe } from '../services/geminiService';

export interface FridgeItem {
  name: string;
  quantity: number;
  unit: string;
}

export const useFridge = (initialItems: string[]) => {
  // Convert initial string array to FridgeItem objects
  const [items, setItems] = useState<FridgeItem[]>(
    initialItems.map(name => ({ name, quantity: 1, unit: 'piece' }))
  );
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeItem = (name: string) => setItems(prev => prev.filter(i => i.name !== name));
  
  const addItem = (itemName?: string) => {
    const newItem = itemName || 'New Item';
    setItems(prev => [...prev, { name: newItem, quantity: 1, unit: 'piece' }]);
    console.log('Adding item:', newItem);
  };

  const updateItemQuantity = (name: string, quantity: number, unit: string) => {
    setItems(prev => prev.map(item => 
      item.name === name ? { ...item, quantity, unit } : item
    ));
  };

  const getRecipe = async () => {
    if (!items.length) return Alert.alert("Fridge Empty", "Add ingredients first!");
    
    setLoading(true);
    // Convert items to readable format for AI: "3 pieces Carrots, 2 cups Milk"
    const ingredientsList = items.map(item => 
      `${item.quantity} ${item.unit}${item.quantity !== 1 ? 's' : ''} ${item.name}`
    );
    const data = await generateFridgeRecipe(ingredientsList);
    setLoading(false);

    if (data && Array.isArray(data) && data.length > 0) {
      setRecipes(data);
    } else {
      Alert.alert("Try Again", "The AI is busy. Please wait 30 seconds.");
    }
  };

  const closeRecipes = () => {
    setRecipes([]);
    setSelectedRecipe(null);
  };

  return { 
    items, 
    recipes, 
    selectedRecipe, 
    loading, 
    removeItem, 
    addItem, 
    getRecipe, 
    setSelectedRecipe,
    closeRecipes,
    updateItemQuantity,
    setItems
  };
};