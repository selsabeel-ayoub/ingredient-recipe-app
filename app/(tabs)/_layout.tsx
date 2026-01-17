import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          headerTitle: "Fridge",
          tabBarLabel: "Fridge",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "fridge" : "fridge-outline"} color={color} size={24} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="recipeBook"
        options={{
          headerTitle: "Recipe Book",
          tabBarLabel: "Recipe Book",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "notebook" : "notebook-outline"} color={color} size={24} />
          ),
        }} 
      />
    </Tabs>
  );
}