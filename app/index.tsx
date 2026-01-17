import { StyleSheet, View } from "react-native";
import FridgeGrid from '../components/FridgeGrid';  

export default function Home() {
  return (
    // This View MUST have flex: 1 to show the grid
    <View style={{ flex: 1 }}> 
      <FridgeGrid />
    </View>
  );
}