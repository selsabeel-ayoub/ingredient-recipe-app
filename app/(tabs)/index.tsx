import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Home() {
  const router = useRouter()
  return (
    <TouchableOpacity
      onPress={() => router.push('/recipeBook')}>
      Hi
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})