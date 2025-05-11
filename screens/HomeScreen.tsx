import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import ContextInput from '../components/ContextInput';
import TreatmentSteps from '../components/TreatmentSteps';

export default function HomeScreen() {
  const [stage, setStage] = useState<'camera' | 'context' | 'treatment'>('camera');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const handleCapture = async () => {
    setImageUri('captured');
    setStage('context');
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera access is required to assess wounds
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {stage === 'camera' && (
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} type="back">
            <View style={styles.overlay}>
              <View style={styles.targetArea} />
            </View>
            <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
              <MaterialIcons name="camera" size={40} color="white" />
            </TouchableOpacity>
          </CameraView>
          <Text style={styles.instruction}>
            Center the wound in the target area
          </Text>
        </View>
      )}

      {stage === 'context' && (
        <ContextInput onComplete={() => setStage('treatment')} />
      )}

      {stage === 'treatment' && (
        <TreatmentSteps onRestart={() => setStage('camera')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#FF4136',
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#FF4136',
    padding: 20,
    borderRadius: 40,
  },
  instruction: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
});