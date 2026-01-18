import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateFridgeRecipe } from "../services/geminiService";
import { useSavedRecipes } from "../hooks/useSavedRecipes";
import { globalStyles as styles, theme } from "../styles/theme";
import { AddButton } from "./AddButton";
import { FridgeItem } from "./FridgeItem";
import { LoadingScreen } from "./LoadingScreen";
import { RecipeModal } from "./RecipeModal";

const FRIDGE_ITEMS_KEY = '@fridge_items';

// Module-level flag that persists across component mounts
let hasInitiallyLoaded = false;
let cachedItems: FridgeItem[] = [];

interface FridgeItem {
  name: string;
  quantity: number;
  unit: string;
}

export default function FridgeGrid() {
  const params = useLocalSearchParams();
  const lastProcessedTimestamp = useRef<string>("");
  
  const [items, setItems] = useState<FridgeItem[]>(cachedItems);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const { saveRecipe } = useSavedRecipes();

  // Load items from AsyncStorage on mount ONCE (across all mounts)
  useEffect(() => {
    if (!hasInitiallyLoaded) {
      console.log("FIRST TIME LOAD - calling loadItems");
      hasInitiallyLoaded = true;
      loadItems();
    } else {
      console.log("USING CACHED ITEMS:", cachedItems.length);
      setItems(cachedItems);
    }
  }, []);

  // Update cache whenever items change
  useEffect(() => {
    cachedItems = items;
    console.log("Updated cache with", items.length, "items");
  }, [items]);

  // Save items to AsyncStorage whenever they change
  useEffect(() => {
    if (hasInitiallyLoaded && items.length >= 0) {
      console.log("Saving items to storage:", items);
      AsyncStorage.setItem(FRIDGE_ITEMS_KEY, JSON.stringify(items)).catch(err => {
        console.error('Error saving items:', err);
      });
    }
  }, [items]);

  const loadItems = async () => {
    try {
      const stored = await AsyncStorage.getItem(FRIDGE_ITEMS_KEY);
      if (stored) {
        const loadedItems = JSON.parse(stored);
        console.log("Loaded items from storage:", loadedItems);
        setItems(loadedItems);
        cachedItems = loadedItems;
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleBookmark = async (recipe: any) => {
    const success = await saveRecipe({
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });

    if (success) {
      Alert.alert(
        "Saved!",
        `${recipe.name} has been added to your Recipe Book`,
      );
    } else {
      Alert.alert(
        "Already Saved",
        `${recipe.name} is already in your Recipe Book`,
      );
    }
  };

  // Listen for new ingredients from the add page
  useEffect(() => {
    if (params.newIngredient && typeof params.newIngredient === "string" && params.timestamp) {
      const ingredientName = params.newIngredient as string;
      const qty = parseInt(params.quantity as string) || 1;
      const unit = (params.unit as string) || "piece";
      const timestamp = params.timestamp as string;
      
      // Only process if we have a new timestamp
      if (timestamp === lastProcessedTimestamp.current) {
        console.log("Skipping - already processed timestamp:", timestamp);
        return;
      }

      console.log("Processing new ingredient:", ingredientName, "timestamp:", timestamp);
      lastProcessedTimestamp.current = timestamp;

      // Use functional update to avoid stale state
      setItems((prev) => {
        console.log("Current items in state:", prev);
        
        // Check for duplicates using the current state
        const isDuplicate = prev.some(
          (item) => item.name.toLowerCase() === ingredientName.toLowerCase(),
        );

        if (isDuplicate) {
          Alert.alert(
            "Duplicate Ingredient",
            `${ingredientName} is already in your fridge. You can tap it to edit the quantity.`,
          );
          return prev; // Return unchanged state
        } else {
          console.log("Adding new ingredient:", ingredientName, qty, unit);
          
          // Add the item with quantity and unit
          const newItems = [
            ...prev,
            {
              name: ingredientName,
              quantity: qty,
              unit: unit,
            },
          ];
          console.log("New items array:", newItems);
          return newItems;
        }
      });
    }
  }, [params.timestamp]);

  const removeItem = (name: string) => {
    setItems(prev => prev.filter(i => i.name !== name));
  };

  const updateItemQuantity = (name: string, quantity: number, unit: string) => {
    setItems(prev => prev.map(item => 
      item.name === name ? { ...item, quantity, unit } : item
    ));
  };

  const getRecipe = async () => {
    if (!items.length) return Alert.alert("Fridge Empty", "Add ingredients first!");
    
    setLoading(true);
    // Convert items to readable format for AI: "3 pieces Carrots, 2 cups Milk"
    const ingredientsList = items.map(item => 
      `${item.quantity} ${item.unit}${item.quantity !== 1 ? 's' : ''} ${item.name}`
    );
    const data = await generateFridgeRecipe(ingredientsList);
    setLoading(false);

    if (data && Array.isArray(data) && data.length > 0) {
      setRecipes(data);
    } else {
      Alert.alert("Try Again", "The AI is busy. Please wait 30 seconds.");
    }
  };

  const closeRecipes = () => {
    setRecipes([]);
    setSelectedRecipe(null);
  };

  console.log("Rendering FridgeGrid with items:", items.length);

  return (
    <ImageBackground
      source={require("../assets/images/flowers-bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={[styles.header, { color: "#D48181" }]}>Fridge</Text>

        {items.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
            <Image 
              source={require("../assets/images/apple.png")} 
              style={{ width: 150, height: 150, marginBottom: 10 }}
              resizeMode="contain"
            />
            
            <Text style={{ 
              fontSize: 22, 
              color: '#D48181', 
              fontWeight: 'bold', 
              marginBottom: 8,
              textAlign: 'center',
              paddingHorizontal: 20
            }}>
              Your fridge is empty!
            </Text>
            <Text style={{ 
              fontSize: 15, 
              color: theme.colors.text, 
              textAlign: 'center', 
              paddingHorizontal: 30,
              marginBottom: 30
            }}>
              Tap "Add Item" below to fill 
            </Text>
            
            <View style={{ width: '90%', marginTop: 20 }}>
              <View style={{ 
                borderBottomWidth: 3, 
                borderBottomColor: theme.colors.border, 
                marginBottom: 50,
                height: 60
              }} />
              <View style={{ 
                borderBottomWidth: 3, 
                borderBottomColor: theme.colors.border, 
                height: 60
              }} />
            </View>
          </View>
        ) : (
          <FlatList
            data={items}
            numColumns={3}
            columnWrapperStyle={styles.shelf}
            renderItem={({ item }) => (
              <FridgeItem
                name={item.name}
                quantity={item.quantity}
                unit={item.unit}
                onRemove={() => removeItem(item.name)}
                onUpdateQuantity={(quantity, unit) =>
                  updateItemQuantity(item.name, quantity, unit)
                }
              />
            )}
            keyExtractor={(item, index) => `${item.name}-${index}`}
          />
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={getRecipe}
          disabled={loading}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Generate Recipes
          </Text>
        </TouchableOpacity>

        <AddButton />
      </View>

      <LoadingScreen visible={loading} />

      <RecipeModal
        visible={recipes.length > 0}
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        onSelectRecipe={setSelectedRecipe}
        onClose={closeRecipes}
        onBookmark={handleBookmark}
      />
    </ImageBackground>
  );
}