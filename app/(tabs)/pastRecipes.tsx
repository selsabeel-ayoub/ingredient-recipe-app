import RecipeCard from '@/Components/recipeCard';
import { globalStyles as styles } from '@/styles/theme';
import { ScrollView, Text, ImageBackground, View, Alert } from 'react-native';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';

export default function pastRecipes() {
    const { savedRecipes, deleteRecipe } = useSavedRecipes();

    const handleDelete = (id: string, name: string) => {
        Alert.alert(
            "Delete Recipe",
            `Are you sure you want to remove "${name}" from your Recipe Book?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteRecipe(id);
                        Alert.alert("Deleted", `${name} has been removed from your Recipe Book`);
                    }
                }
            ]
        );
    };

    const recipeCards = savedRecipes.length > 0 ? (
        savedRecipes.map(recipe => (
            <RecipeCard 
                key={recipe.id} 
                name={recipe.name} 
                ingredients={recipe.ingredients} 
                instructions={recipe.instructions}
                onDelete={() => handleDelete(recipe.id, recipe.name)}
            />
        ))
    ) : (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 60, marginBottom: 15 }}>📖</Text>
            <Text style={[styles.chooseRecipeSubtitle, { fontSize: 18 }]}>
                No saved recipes yet
            </Text>
            <Text style={[styles.chooseRecipeSubtitle, { marginTop: 10 }]}>
                Generate and bookmark recipes from your fridge!
            </Text>
        </View>
    );

    return (
        <ImageBackground 
            source={require('@/assets/images/flowers-bg.png')}
            style={styles.recipeModalContainer}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <ScrollView 
                    contentContainerStyle={styles.recipeScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.chooseRecipeTitle}>Recipe Book</Text>
                    <Text style={styles.chooseRecipeSubtitle}>Your saved recipes</Text>
                    
                    <View style={styles.recipeOptionsContainer}>
                        {recipeCards}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}