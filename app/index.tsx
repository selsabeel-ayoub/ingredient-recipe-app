import { StyleSheet, Text } from "react-native";

export default function Home() {
  return (
    <Text style={styles.container}>Hi</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})