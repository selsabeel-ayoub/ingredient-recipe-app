import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/styles/theme';

interface RecipeCardProps {
    name: string;
    ingredients: string[];
    instructions: string;
    onDelete?: () => void;
}

export default function RecipeCard({ name, ingredients, instructions, onDelete }: RecipeCardProps) {
    return (
        <View style={styles.card}>
            {onDelete && (
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={onDelete}
                >
                    <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
            )}
            
            <Text style={styles.cardTitle}>{name}</Text>
            
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <View style={styles.ingredientsList}>
                {Array.isArray(ingredients) && ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.ingredientItem}>• {ingredient}</Text>
                    ))
                ) : (
                    <Text style={styles.ingredientItem}>No ingredients available</Text>
                )}
            </View>
            
            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Text style={styles.cardDetails}>{instructions || 'No instructions available'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: theme.colors.secondary,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.border,
        zIndex: 10,
    },
    deleteText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.danger,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#D48181',
        paddingRight: 40, // Space for delete button
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: 10,
        marginBottom: 8,
    },
    ingredientsList: {
        marginBottom: 10,
    },
    ingredientItem: {
        fontSize: 15,
        color: theme.colors.text,
        marginBottom: 4,
        lineHeight: 22,
    },
    cardDetails: {
        fontSize: 15,
        color: theme.colors.text,
        lineHeight: 22,
    },
});