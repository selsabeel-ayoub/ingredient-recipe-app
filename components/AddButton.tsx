import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles as styles } from '../styles/theme'; 

export const AddButton = () => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.addItemButton} 
      onPress={() => router.push('/newIngredient')}
    >
      <Text style={styles.addItemButtonText}>Add Item</Text>
    </TouchableOpacity>
  );
};