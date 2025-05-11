import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type BleedingSpeed = 'slow' | 'moderate' | 'spurting';

export default function ContextInput({ onComplete }: { onComplete: () => void }) {
  const [minutes, setMinutes] = useState<number>(0);
  const [bleeding, setBleeding] = useState<BleedingSpeed | null>(null);

  const handleComplete = () => {
    if (bleeding) {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Assessment</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Minutes since injury:</Text>
        <View style={styles.timeControls}>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setMinutes(m => Math.max(0, m - 1))}
          >
            <MaterialIcons name="remove" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.timeText}>{minutes}</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setMinutes(m => m + 1)}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Bleeding speed:</Text>
        <View style={styles.bleedingOptions}>
          {(['slow', 'moderate', 'spurting'] as BleedingSpeed[]).map((speed) => (
            <TouchableOpacity
              key={speed}
              style={[
                styles.bleedingButton,
                bleeding === speed && styles.bleedingButtonSelected
              ]}
              onPress={() => setBleeding(speed)}
            >
              <Text style={[
                styles.bleedingButtonText,
                bleeding === speed && styles.bleedingButtonTextSelected
              ]}>
                {speed.charAt(0).toUpperCase() + speed.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.continueButton, !bleeding && styles.continueButtonDisabled]}
        onPress={handleComplete}
        disabled={!bleeding}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
        <MaterialIcons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  timeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButton: {
    backgroundColor: '#FF4136',
    padding: 15,
    borderRadius: 10,
  },
  timeText: {
    fontSize: 24,
    color: '#fff',
    marginHorizontal: 20,
    minWidth: 40,
    textAlign: 'center',
  },
  bleedingOptions: {
    flexDirection: 'column',
    gap: 10,
  },
  bleedingButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  bleedingButtonSelected: {
    backgroundColor: '#FF4136',
  },
  bleedingButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  bleedingButtonTextSelected: {
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FF4136',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#666',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});