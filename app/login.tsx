import { useRouter } from "expo-router";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    if (username.length > 0 && password.length > 0) {
      console.log('Login attempt:', username);
      setErrorMessage(""); // Clear error message on successful login
      // For now, just navigate back to home
      router.back();
    } else {
      console.log('Please enter both username and password.');
      setErrorMessage('ERROR 505: Please fill both Username and Password!');
    }
  };

  const handleSignUp = () => {
    // Add your login logic here
    if (username.length > 0 && password.length > 0) {
      console.log('Login attempt:', username);
      setErrorMessage(""); // Clear error message on successful login
      // For now, just navigate back to home
      router.back();
    } else {
      console.log('Please enter both username and password.');
      setErrorMessage('ERROR 506: Please fill both Username and Password!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.back();
          console.log('Going back!');
        }}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E9',
    padding: 20,
  },
  title: {
    paddingTop: 60,
    paddingBottom: 30,
    color: 'magenta',
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#D87093',
    marginBottom: 8,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'hotpink',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});