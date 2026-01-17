import { useRouter } from "expo-router";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function AddIngredient() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Ingredient</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter ingredient name"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
      />
      
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Add notes (optional)"
        multiline
      />
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Add your save logic here
          console.log('Ingredient saved!');
        }}
      >
        <Text style={styles.buttonText}>Save Ingredient</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.back();
          console.log('Going back to Main Menu!');
        }}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: 15,
  },
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    color: 'magenta',
    fontSize: 32,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  notesInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: 'hotpink',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});