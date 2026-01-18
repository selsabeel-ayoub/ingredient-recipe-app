import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../styles/theme'; 

interface AddButtonProps {
  onPress: () => void;
}

export const AddButton = ({ onPress }: AddButtonProps) => (
  <TouchableOpacity 
    style={[
      styles.button, 
      { backgroundColor: theme.colors.primary, borderColor: theme.colors.border }
    ]} 
    onPress={onPress}
  >
    <Text style={[styles.text, { color: theme.colors.text }]}>ADD</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { 
    borderWidth: 3, 
    padding: 15, 
    alignItems: 'center', 
    marginTop: 10,
    borderRadius: 20, // Match the rounded look of the recipe button
  },
  text: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
});