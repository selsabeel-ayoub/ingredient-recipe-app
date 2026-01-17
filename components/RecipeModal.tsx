import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles as styles } from '../styles/theme';

interface RecipeModalProps {
  visible: boolean;
  recipe: { name: string; ingredients: string[]; instructions: string } | null;
  onClose: () => void;
}

export const RecipeModal = ({ visible, recipe, onClose }: RecipeModalProps) => (
  <Modal visible={visible} animationType="slide">
    <View style={styles.modalContent}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.recipeTitle}>{recipe?.name}</Text>
        
        <Text style={styles.sectionHeader}>Ingredients:</Text>
        {recipe?.ingredients?.map((ing, i) => (
          <Text key={i} style={styles.bodyText}>• {ing}</Text>
        ))}
        
        <Text style={styles.sectionHeader}>Instructions:</Text>
        <Text style={styles.bodyText}>{recipe?.instructions}</Text>
        
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </Modal>
);