import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { theme } from '../styles/theme';

interface LoadingScreenProps {
  visible: boolean;
}

export const LoadingScreen = ({ visible }: LoadingScreenProps) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View style={styles.container}>
        {!videoError ? (
          <Video
            source={require('../assets/images/loading.mp4')}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted={false}
            onError={(error) => {
              console.log('Video error:', error);
              setVideoError(true);
            }}
          />
        ) : (
          <View style={styles.fallback}>
            <ActivityIndicator size="large" color="#D48181" />
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.loadingText}>Generating Recipes...</Text>
          <Text style={styles.subText}>Finding the perfect dishes for you</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});