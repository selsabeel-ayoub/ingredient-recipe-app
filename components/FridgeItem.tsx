import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { globalStyles as styles, theme } from '../styles/theme'; 

interface FridgeItemProps {
  name: string;
  quantity: number;
  unit: string;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number, unit: string) => void;
}

const UNITS = [
  'piece', 'cup', 'gram', 'ounce', 'liter', 'milliliter',
  'tablespoon', 'teaspoon', 'pound', 'kilogram', 'slice', 'can'
];

export const FridgeItem = ({ name, quantity, unit, onRemove, onUpdateQuantity }: FridgeItemProps) => {
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(quantity.toString());
  const [selectedUnit, setSelectedUnit] = useState(unit);

  const handleSaveQuantity = () => {
    const newQty = parseInt(tempQuantity) || 1;
    onUpdateQuantity(newQty, selectedUnit);
    setShowQuantityModal(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.box} 
        onPress={() => {
          setTempQuantity(quantity.toString());
          setSelectedUnit(unit);
          setShowQuantityModal(true);
        }}
        activeOpacity={0.7}
      >
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
        <Text style={[styles.text, { textAlign: 'center', paddingHorizontal: 8, marginBottom: 5 }]}>
          {name}
        </Text>
        <Text style={styles.quantityDisplayText}>
          {quantity} {unit}{quantity !== 1 ? 's' : ''}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showQuantityModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQuantityModal(false)}
      >
        <View style={styles.quantityModalOverlay}>
          <View style={styles.quantityModalContent}>
            <Text style={styles.quantityModalTitle}>Edit Quantity</Text>
            <Text style={styles.quantityModalSubtitle}>{name}</Text>
            
            <TextInput
              style={styles.quantityInput}
              value={tempQuantity}
              onChangeText={setTempQuantity}
              keyboardType="number-pad"
              placeholder="Quantity"
            />
            
            <Text style={styles.unitLabel}>Unit:</Text>
            <ScrollView style={styles.unitScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.unitGrid}>
                {UNITS.map((u) => (
                  <TouchableOpacity
                    key={u}
                    style={[
                      styles.unitButton,
                      selectedUnit === u && styles.unitButtonSelected
                    ]}
                    onPress={() => setSelectedUnit(u)}
                  >
                    <Text style={[
                      styles.unitButtonText,
                      selectedUnit === u && styles.unitButtonTextSelected
                    ]}>
                      {u}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.quantityModalButtons}>
              <TouchableOpacity 
                style={styles.quantityModalCancelButton}
                onPress={() => setShowQuantityModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quantityModalSaveButton}
                onPress={handleSaveQuantity}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};