import { View, Text, StyleSheet } from 'react-native';

interface RecipeCardProps {
    name: string;
    time: string;
    portion: string;
    ingredients: string[];
    instructions: string;
}

export default function RecipeCard({ name, ingredients, instructions }: RecipeCardProps) {

    return (
        <>
        {/* Recipe Card Component */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardDetails}>Ingredients: {ingredients.join(', ')}</Text>
            <Text style={styles.cardDetails}>Instructions: {instructions}</Text>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardDetails: {
        fontSize: 16,
        marginBottom: 5,
    },
});