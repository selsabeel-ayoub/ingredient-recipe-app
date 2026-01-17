import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles as styles } from '../styles/theme'; 

interface FridgeItemProps {
  name: string;
  onRemove: () => void;
}

export const FridgeItem = ({ name, onRemove }: FridgeItemProps) => (
  <View style={styles.box}>
    <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
      <Text style={styles.deleteText}>X</Text>
    </TouchableOpacity>
    <Text style={styles.text}>{name}</Text>
  </View>
);