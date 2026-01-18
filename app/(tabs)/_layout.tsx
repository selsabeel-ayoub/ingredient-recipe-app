import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f3909f',
        tabBarInactiveTintColor: '#FFB6C1',
        tabBarStyle: {
          backgroundColor: '#FFE4E9',
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: '#FF69B4',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Times New Roman',
        },
        tabBarItemStyle: {
          borderRadius: 15,
          marginHorizontal: 5,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          headerTitle: "🌸 Fridge 🌸",
          tabBarLabel: "Fridge",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "fridge" : "fridge-outline"} 
              color={color} 
              size={focused ? 28 : 24} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="pastRecipes"
        options={{
          headerTitle: "🌸 Recipe Book 🌸",
          tabBarLabel: "Recipe Book",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "notebook" : "notebook-outline"} 
              color={color} 
              size={focused ? 28 : 24} 
            />
          ),
        }} 
      />
    </Tabs>
  );
}