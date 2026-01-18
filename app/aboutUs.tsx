import { useRouter } from 'expo-router';

export default function aboutUs() {
    const router = useRouter();
    return (
        console.log('Going back to Main Menu!'),
        router.back()
    );
}