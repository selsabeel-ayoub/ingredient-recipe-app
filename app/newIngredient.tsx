import { useRouter } from "expo-router";
import { View, Text, ScrollView, TextInput, StyleSheet, Button } from "react-native";

export default function AddIngredient() {
    const router = useRouter();
  return (
    <ScrollView>
      <TextInput
        style={{
          height: 60,
          borderColor: 'black',
          borderWidth: 3,
        }}
        defaultValue="You can type in me"
      />
      <Text>Random text</Text>
      <View>
        <Text>Some more text</Text>
      </View>
      <Button
        onPress={() => {
          router.back();
          console.log('Going back to Main Menu!');
        }}
        title="Back"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})