import { router } from "expo-router";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    "Welcome to ChefSSS!",
    "Short on ingredients? Find recipes that suits whatever you got!",
    "From Michelin Star to Diarrhea Sewer Food, we've got it all!",
    "Never again will you be short on one ingredient.",
    "Whatever you've got, we'll make it all",
    "Cooking is an art, and you're the artist.",
    "Research shows 10 out of 10 good meals tastes good.",
    "ChefSSS is approved by Her Majesty, Queen Steven.",
    ":)"
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuoteIndex(randomIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.push('/aboutUs');
            console.log('Going to About Us!');
          }}
        >
          <Text style={styles.headerButtonText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.push('/pastRecipes');
            console.log('Going to Past Recipes!');
          }}
        >
          <Text style={styles.headerButtonText}>Past Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.push('/login');
            console.log('Going to Login/Sign Up!');
          }}
        >
          <Text style={styles.headerButtonText}>Login/Sign Up</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>ChefSSS</Text>
        
        <View>
          <Text style={styles.subtitle}>
            By Queen Steven Studios
          </Text>
        </View>
        
        <Text style={styles.paragraph}>
          "{quotes[currentQuoteIndex]}"
        </Text>
        
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'hotpink',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
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
  paragraph: {
    fontSize: 18,
    color: '#D87093',
    lineHeight: 28,
    margin: 20,
    padding: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Times New Roman',
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