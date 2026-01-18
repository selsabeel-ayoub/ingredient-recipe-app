import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { globalStyles as styles } from '@/styles/theme';

const UNITS = [
  'piece', 'cup', 'gram', 'ounce', 'liter', 'milliliter',
  'tablespoon', 'teaspoon', 'pound', 'kilogram', 'slice', 'can'
];

export default function NewIngredient() {
  const router = useRouter();
  const [ingredientName, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState('piece');

  const handleSave = () => {
    if (ingredientName.trim()) {
      router.push({
        pathname: '/(tabs)',
        params: {
          newIngredient: ingredientName.trim(),
          quantity: quantity,
          unit: selectedUnit
        }
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground 
        source={require('@/assets/images/flowers-bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { paddingTop: 50 }]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20 }}>
            <Text style={[styles.pageTitle, { paddingTop: 20, paddingBottom: 20 }]}>Add New Ingredient</Text>
            
            <Text style={styles.inputLabel}>Ingredient Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Carrots, Milk, Eggs"
              value={ingredientName}
              onChangeText={setIngredientName}
              placeholderTextColor="#C4A4A4"
            />

            <Text style={styles.inputLabel}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="number-pad"
              placeholderTextColor="#C4A4A4"
            />

            <Text style={styles.inputLabel}>Unit</Text>
            <View style={[styles.unitGrid, { marginBottom: 25 }]}>
              {UNITS.map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.unitButton,
                    selectedUnit === unit && styles.unitButtonSelected
                  ]}
                  onPress={() => setSelectedUnit(unit)}
                >
                  <Text style={[
                    styles.unitButtonText,
                    selectedUnit === unit && styles.unitButtonTextSelected
                  ]}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Add to Fridge</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
}