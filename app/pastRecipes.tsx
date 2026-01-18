import Header from '@/Components/header';
import RecipeCard from '@/Components/recipeCard';
import { useRouter } from 'expo-router';
import { Text, StyleSheet, ScrollView } from 'react-native';

export default function pastRecipes() {
    const router = useRouter();

    const pastRecipesList = [
        { id: 1, name: "Pasta Carbonara", time: "30 mins", portion: "4 servings", ingredients: ["Pasta", "Eggs", "Bacon"], instructions: "Cook pasta, mix with eggs and bacon." },
        { id: 2, name: "Chicken Stir Fry", time: "25 mins", portion: "4 servings", ingredients: ["Chicken", "Bell Peppers", "Soy Sauce"], instructions: "Stir fry chicken and vegetables in soy sauce." },
        { id: 3, name: "Vegetable Soup", time: "45 mins", portion: "6 servings", ingredients: ["Carrots", "Celery", "Onions", "Broth"], instructions: "Simmer vegetables in broth until tender." },
        { id: 4, name: "Beef Tacos", time: "20 mins", portion: "4 servings", ingredients: ["Ground Beef", "Taco Shells", "Lettuce", "Cheese"], instructions: "Cook beef and assemble tacos with toppings." },
        { id: 5, name: "Grilled Cheese Sandwich", time: "10 mins", portion: "1 serving", ingredients: ["Bread", "Cheese", "Butter"], instructions: "Butter bread, add cheese, and grill until golden." },
        { id: 6, name: "Caesar Salad", time: "15 mins", portion: "2 servings", ingredients: ["Romaine Lettuce", "Croutons", "Caesar Dressing"], instructions: "Toss lettuce with croutons and dressing." },
        { id: 7, name: "Pancakes", time: "20 mins", portion: "4 servings", ingredients: ["Flour", "Eggs", "Milk", "Baking Powder"], instructions: "Mix ingredients and cook on griddle." },
        { id: 8, name: "Spaghetti Bolognese", time: "40 mins", portion: "4 servings", ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce"], instructions: "Cook spaghetti and top with meat sauce." },
        { id: 9, name: "Fruit Smoothie", time: "10 mins", portion: "2 servings", ingredients: ["Mixed Fruits", "Yogurt", "Honey"], instructions: "Blend all ingredients until smooth." },
        { id: 10, name: "Omelette", time: "15 mins", portion: "1 serving", ingredients: ["Eggs", "Cheese", "Vegetables"], instructions: "Beat eggs, add fillings, and cook in pan." },
    ];

    const recipeCards = pastRecipesList.map(recipe => (
        <RecipeCard key={recipe.id} name={recipe.name} time={recipe.time} portion={recipe.portion} ingredients={recipe.ingredients} instructions={recipe.instructions} />
    ));

    return (
        <>
        <Header />

        // console.log('Going back to Main Menu!'),
        // router.back()
        <Text style={styles.title}>
            Past Recipes - Under Construction</Text>

        <ScrollView>{recipeCards}</ScrollView>
        </>
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
    paddingTop: 40,
    paddingLeft: 15,
    color: 'magenta',
    fontSize: 32,
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