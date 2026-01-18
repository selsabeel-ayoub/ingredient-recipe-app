import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { use, useState } from 'react';

export default function Header() {
    const [username, setUsername] = useState("Login/Sign Up");

    const router = useRouter();
    return (
        <>
        {/* Header Navigation */}
        <View style={styles.header}>
        <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
            router.back();
            console.log('Going to Main Menu!');
        }}
        >
        <Text style={styles.headerButtonText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
            router.push('/pastRecipes');
            console.log('Going to Past Recipes!');
        }}
        >
        <Text style={styles.headerButtonText}>Past Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
            router.push('/login');
            console.log('Going to Login/Sign Up!');
        }}
        >
        <Text style={styles.headerButtonText}>{username}</Text>
        </TouchableOpacity>
    </View>
    </>
    );
}

const styles = StyleSheet.create({
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
});