import { useRouter } from 'expo-router';

export default function pastRecipes() {
    const router = useRouter();
    return (
        console.log('Going back to Main Menu!'),
        router.back()
    );
}