import { StyleSheet, View } from "react-native";
import FridgeGrid from '../components/FridgeGrid';  

export default function Home() {
  return (
    <View style={{ flex: 1 }}> 
      <FridgeGrid />
    </View>
  );
}