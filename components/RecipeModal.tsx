import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';

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
        {recipe?.ingredients.map((ing, i) => <Text key={i} style={styles.bodyText}>• {ing}</Text>)}
        <Text style={styles.sectionHeader}>Instructions:</Text>
        <Text style={styles.bodyText}>{recipe?.instructions}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContent: { flex: 1, backgroundColor: '#fff', marginTop: 50 },
  scrollContainer: { padding: 30, paddingBottom: 60 },
  recipeTitle: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32' },
  sectionHeader: { fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  bodyText: { fontSize: 17, lineHeight: 26, color: '#444' },
  closeButton: { marginTop: 40, padding: 18, backgroundColor: '#333', borderRadius: 12, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontWeight: 'bold' }
});