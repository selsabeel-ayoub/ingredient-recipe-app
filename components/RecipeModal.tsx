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
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity 
              onPress={() => onSelectRecipe(null)} 
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back to Options</Text>
            </TouchableOpacity>

            <Text style={styles.recipeTitle}>{selectedRecipe.name}</Text>
            
            <Text style={styles.sectionHeader}>Ingredients:</Text>
            {selectedRecipe.ingredients?.map((ing: string, i: number) => (
              <Text key={i} style={styles.bodyText}>• {ing}</Text>
            ))}
            
            <Text style={styles.sectionHeader}>Instructions:</Text>
            <Text style={styles.bodyText}>{selectedRecipe.instructions}</Text>
            
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  // Show recipe options
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.recipeTitle}>Choose a Recipe</Text>
          
          {recipes.map((recipe, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.recipeOption}
              onPress={() => onSelectRecipe(recipe)}
            >
              <Text style={styles.recipeOptionTitle}>{recipe.name}</Text>
              <Text style={styles.recipeOptionArrow}>→</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};