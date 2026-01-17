import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FridgeItemProps {
  name: string;
  onRemove: () => void;
}

export const FridgeItem = ({ name, onRemove }: FridgeItemProps) => {
  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { 
    width: '31%',                
    marginRight: '3.5%',         
    marginBottom: 15,           
    height: 100, 
    borderWidth: 2, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  text: { fontWeight: 'bold' },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: { fontSize: 10, fontWeight: 'bold', color: 'red' },
});