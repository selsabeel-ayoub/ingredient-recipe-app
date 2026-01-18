import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles as styles, theme } from '../styles/theme';

interface RecipeModalProps {
  visible: boolean;
  recipes: any[];
  selectedRecipe: any;
  onSelectRecipe: (recipe: any) => void;
  onClose: () => void;
}

export const RecipeModal = ({ visible, recipes, selectedRecipe, onSelectRecipe, onClose }: RecipeModalProps) => {
  // If a recipe is selected, show the full recipe view
  if (selectedRecipe) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.recipeModalContainer}>
          <ScrollView 
            contentContainerStyle={styles.recipeScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.recipeHeader}>
              <TouchableOpacity 
                onPress={() => onSelectRecipe(null)} 
                style={styles.recipeBackButton}
              >
                <Text style={styles.recipeBackButtonText}>← Back</Text>
              </TouchableOpacity>
              
              <Text style={styles.selectedRecipeTitle}>{selectedRecipe.name}</Text>
            </View>
            
            <View style={styles.recipeSection}>
              <Text style={styles.recipeSectionTitle}>Ingredients</Text>
              <View style={styles.ingredientsList}>
                {selectedRecipe.ingredients?.map((ing: string, i: number) => (
                  <View key={i} style={styles.ingredientItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.ingredientText}>{ing}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.recipeSection}>
              <Text style={styles.recipeSectionTitle}>Instructions</Text>
              <Text style={styles.instructionsText}>{selectedRecipe.instructions}</Text>
            </View>
            
            <TouchableOpacity onPress={onClose} style={styles.recipeCloseButton}>
              <Text style={styles.recipeCloseButtonText}>Done</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  // Show recipe options
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.recipeModalContainer}>
        <ScrollView 
          contentContainerStyle={styles.recipeScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.chooseRecipeTitle}>Choose Your Recipe</Text>
          <Text style={styles.chooseRecipeSubtitle}>Pick one of these delicious options</Text>
          
          <View style={styles.recipeOptionsContainer}>
            {recipes.map((recipe, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.recipeBookCard}
                onPress={() => onSelectRecipe(recipe)}
                activeOpacity={0.7}
              >
                <View style={styles.bookSpine} />
                <View style={styles.bookContent}>
                  <Text style={styles.recipeBookNumber}>Recipe {index + 1}</Text>
                  <Text style={styles.recipeBookTitle}>{recipe.name}</Text>
                  <Text style={styles.tapToOpen}>Tap to open →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity onPress={onClose} style={styles.recipeOptionsCloseButton}>
            <Text style={styles.recipeOptionsCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};