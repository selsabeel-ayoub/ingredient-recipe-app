import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FridgeItem } from './FridgeItem'; 
import { AddButton } from './AddButton';
import { RecipeModal } from './RecipeModal';
import { LoadingScreen } from './LoadingScreen';
import { useFridge } from '../hooks/useFridge';
import { globalStyles as styles, theme } from '../styles/theme';
import { generateFridgeRecipe } from '../services/geminiService';

export default function FridgeGrid() {
  const params = useLocalSearchParams();
  const { 
    items, 
    recipes, 
    selectedRecipe, 
    loading, 
    removeItem, 
    addItem, 
    getRecipe, 
    setSelectedRecipe,
    closeRecipes 
  } = useFridge(['Carrots', 'Milk', 'Apple', "Eggplant", "Soysauce", "Cocoa Powder"]);

  // Listen for new ingredients from the add page
  useEffect(() => {
    console.log('Params received:', params); // Debug log
    if (params.newIngredient && typeof params.newIngredient === 'string') {
      console.log('Adding new ingredient:', params.newIngredient); // Debug log
      addItem(params.newIngredient);
    }
  }, [params.newIngredient]);

  return (
    <ImageBackground 
      source={require('../assets/images/fridge.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.header}>Fridge</Text>
      
      <FlatList
        data={items}
        numColumns={3}
        columnWrapperStyle={styles.shelf}
        renderItem={({ item }) => (
          <FridgeItem name={item} onRemove={() => removeItem(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity 
        style={[styles.actionButton, { backgroundColor: theme.colors.primary }]} 
        onPress={getRecipe}
        disabled={loading}
      >
        <Text style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: 18 }}>
          Generate Recipes
        </Text>
      </TouchableOpacity>

      <AddButton />

      <LoadingScreen visible={loading} />

      <RecipeModal 
        visible={recipes.length > 0} 
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        onSelectRecipe={setSelectedRecipe}
        onClose={closeRecipes} 
      />
    </ImageBackground>
  );
}