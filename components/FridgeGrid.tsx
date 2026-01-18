import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { FridgeItem } from './FridgeItem'; 
import { AddButton } from './AddButton';
import { RecipeModal } from './RecipeModal';
import { LoadingScreen } from './LoadingScreen';
import { useFridge } from '../hooks/useFridge';
import { globalStyles as styles, theme } from '../styles/theme';

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
        style={[styles.actionButton, { backgroundColor: theme.colors.primary }]} 
        onPress={getRecipe}
        disabled={loading}
      >
        <Text style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: 18 }}>
          Generate Recipes
        </Text>
      </TouchableOpacity>

      <AddButton onPress={addItem} />

      <LoadingScreen visible={loading} />

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