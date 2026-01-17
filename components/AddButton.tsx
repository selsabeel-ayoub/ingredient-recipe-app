import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AddButtonProps {
  onPress: () => void;
}

export const AddButton = ({ onPress }: AddButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>ADD</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { borderWidth: 3, padding: 15, alignItems: 'center', marginTop: 10 },
  text: { fontSize: 20, fontWeight: 'bold' },
});