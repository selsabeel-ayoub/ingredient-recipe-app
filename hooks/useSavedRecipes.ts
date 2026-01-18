import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_RECIPES_KEY = '@saved_recipes';

export interface SavedRecipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  savedAt: number;
}

export const useSavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  // Load saved recipes on mount
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
      if (stored) {
        setSavedRecipes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  const saveRecipe = async (recipe: Omit<SavedRecipe, 'id' | 'savedAt'>) => {
    try {
      // Check if recipe with same name already exists
      const exists = savedRecipes.find(r => r.name.toLowerCase() === recipe.name.toLowerCase());
      
      if (exists) {
        console.log('Recipe already saved');
        return false;
      }

      const newRecipe: SavedRecipe = {
        ...recipe,
        id: Date.now().toString(),
        savedAt: Date.now(),
      };

      const updated = [newRecipe, ...savedRecipes];
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updated));
      setSavedRecipes(updated);
      console.log('Recipe saved successfully. Total recipes:', updated.length);
      return true;
    } catch (error) {
      console.error('Error saving recipe:', error);
      return false;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const updated = savedRecipes.filter(r => r.id !== id);
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updated));
      setSavedRecipes(updated);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return {
    savedRecipes,
    saveRecipe,
    deleteRecipe,
    loadRecipes,
  };
};