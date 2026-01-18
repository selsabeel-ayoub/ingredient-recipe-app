import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { FridgeItem } from './FridgeItem'; 
import { AddButton } from './AddButton';
import { RecipeModal } from './RecipeModal';
import { useFridge } from '../hooks/useFridge';
import { globalStyles as styles, theme } from '../styles/theme';
import { generateFridgeRecipe } from '../services/geminiService';

export default function FridgeGrid() {
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

  return (
    <View style={styles.container}>
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
        style={[styles.actionButton, { backgroundColor: loading ? theme.colors.secondary : theme.colors.primary }]} 
        onPress={getRecipe}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.text} />
        ) : (
          <Text style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: 18 }}>
            Generate Recipes
          </Text>
        )}
      </TouchableOpacity>

      <AddButton onPress={addItem} />

      <RecipeModal 
        visible={recipes.length > 0} 
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        onSelectRecipe={setSelectedRecipe}
        onClose={closeRecipes} 
      />
    </View>
  );
}