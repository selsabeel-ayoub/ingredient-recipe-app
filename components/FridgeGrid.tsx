import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FridgeItem } from './FridgeItem'; 
import { AddButton } from './AddButton';
import { RecipeModal } from './RecipeModal';
import { LoadingScreen } from './LoadingScreen';
import { useFridge } from '../hooks/useFridge';
import { useSavedRecipes } from '../hooks/useSavedRecipes';
import { globalStyles as styles, theme } from '../styles/theme';
import { generateFridgeRecipe } from '../services/geminiService';

export default function FridgeGrid() {
  const params = useLocalSearchParams();
  const lastProcessedIngredient = useRef<string>('');
  
  const { 
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
  } = useFridge(['Carrots', 'Milk', 'Apple', "Eggplant", "Soysauce", "Cocoa Powder"]);

  const { saveRecipe } = useSavedRecipes();

  const handleBookmark = async (recipe: any) => {
    const success = await saveRecipe({
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });

    if (success) {
      Alert.alert('Saved!', `${recipe.name} has been added to your Recipe Book`);
    } else {
      Alert.alert('Already Saved', `${recipe.name} is already in your Recipe Book`);
    }
  };

  // Listen for new ingredients from the add page
  useEffect(() => {
    console.log('Params received:', params);
    if (params.newIngredient && typeof params.newIngredient === 'string') {
      const ingredientName = params.newIngredient as string;
      
      // Skip if we've already processed this exact ingredient
      if (lastProcessedIngredient.current === ingredientName) {
        return;
      }
      
      lastProcessedIngredient.current = ingredientName;
      
      const qty = parseInt(params.quantity as string) || 1;
      const unit = (params.unit as string) || 'piece';
      
      // Check for duplicates
      const isDuplicate = items.some(item => 
        item.name.toLowerCase() === ingredientName.toLowerCase()
      );
      
      if (isDuplicate) {
        Alert.alert(
          'Duplicate Ingredient',
          `${ingredientName} is already in your fridge. You can tap it to edit the quantity.`
        );
      } else {
        console.log('Adding new ingredient:', ingredientName, qty, unit);
        
        // Add the item with quantity and unit
        setItems(prev => [...prev, {
          name: ingredientName,
          quantity: qty,
          unit: unit
        }]);
      }
    }
  }, [params.newIngredient, params.quantity, params.unit, items]);

  return (
    <ImageBackground 
      source={require('../assets/images/flowers-bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={[styles.header, { color: '#D48181' }]}>Fridge</Text>
        
        <FlatList
          data={items}
          numColumns={3}
          columnWrapperStyle={styles.shelf}
          renderItem={({ item }) => (
            <FridgeItem 
              name={item.name} 
              quantity={item.quantity}
              unit={item.unit}
              onRemove={() => removeItem(item.name)}
              onUpdateQuantity={(quantity, unit) => updateItemQuantity(item.name, quantity, unit)}
            />
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
      </View>

      <LoadingScreen visible={loading} />

      <RecipeModal 
        visible={recipes.length > 0} 
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        onSelectRecipe={setSelectedRecipe}
        onClose={closeRecipes}
        onBookmark={handleBookmark}
      />
    </ImageBackground>
  );
}