import { useState } from 'react';
import { Alert } from 'react-native';
import { generateFridgeRecipe } from '../services/geminiService';

export const useFridge = (initialItems: string[]) => {
  const [items, setItems] = useState(initialItems);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeItem = (name: string) => setItems(prev => prev.filter(i => i !== name));
  const addItem = () => setItems(prev => [...prev, 'New Item']);

  const getRecipe = async () => {
    if (!items.length) return Alert.alert("Fridge Empty", "Add ingredients first!");
    
    setLoading(true);
    const data = await generateFridgeRecipe(items);
    setLoading(false);

    if (data) setRecipe(data);
    else Alert.alert("Try Again", "The AI is busy. Please wait 30 seconds.");
  };

  return { items, recipe, loading, removeItem, addItem, getRecipe, setRecipe };
};