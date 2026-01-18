import RecipeCard from '@/components/RecipeCard';
import { globalStyles as styles } from '@/styles/theme';
import { ScrollView, Text } from 'react-native';

export default function pastRecipes() {
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
        <Text style={styles.header}>Recipe Book</Text>
        <ScrollView>{recipeCards}</ScrollView>
      </>
    );
}
