import { StyleSheet, View } from "react-native";
import FridgeGrid from '../components/FridgeGrid';  

export default function Home() {
  return (
    <View style={styles.container}>
      <FridgeGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // tells screen to use the full height
  },
});