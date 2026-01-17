import { router } from "expo-router";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function Home() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [scaleAnim]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ChefSSS</Text>
      
      <View>
        <Text style={styles.subtitle}>
          By Queen Steven Studios
        </Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Enter some text here"
      />
      
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            router.push('/newIngredient');
            console.log('Going to add Ingredients!');
          }}
        >
          <Text style={styles.addButtonText}>Add Ingredients</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  title: {
    height: 84,
    paddingTop: 40,
    paddingLeft: 15,
    color: 'magenta',
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  subtitle: {
    height: 40,
    paddingLeft: 30,
    color: 'black',
    fontStyle: 'italic',
    fontSize: 8,
    fontFamily: 'Times New Roman',
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 15,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'hotpink',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 25,
    margin: 30,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});