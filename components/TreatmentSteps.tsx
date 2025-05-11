import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Mock MARCH-E steps for demo
const TREATMENT_STEPS = [
  {
    title: "Massive Hemorrhage",
    instruction: "Apply direct pressure to wound site. If available, use hemostatic gauze and pressure dressing.",
    action: "Maintain pressure for 3-5 minutes"
  },
  {
    title: "Airway",
    instruction: "Check airway is clear and maintained. Monitor for obstruction.",
    action: "Ensure patient can breathe normally"
  },
  {
    title: "Respiratory",
    instruction: "Assess breathing rate and quality. Look for chest injuries.",
    action: "Monitor breathing pattern"
  },
  {
    title: "Circulation",
    instruction: "Check pulse and blood pressure if possible. Monitor skin color.",
    action: "Document vital signs"
  }
];

export default function TreatmentSteps({ onRestart }: { onRestart: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleNext = () => {
    if (currentStep < TREATMENT_STEPS.length - 1) {
      setCurrentStep(c => c + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Treatment Steps</Text>
        <View style={styles.audioToggle}>
          <Switch
            value={audioEnabled}
            onValueChange={setAudioEnabled}
            trackColor={{ false: '#666', true: '#FF4136' }}
          />
          <Text style={styles.audioLabel}>Read Aloud</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.stepCount}>
          Step {currentStep + 1} of {TREATMENT_STEPS.length}
        </Text>
        <Text style={styles.stepTitle}>
          {TREATMENT_STEPS[currentStep].title}
        </Text>
        <Text style={styles.instruction}>
          {TREATMENT_STEPS[currentStep].instruction}
        </Text>
        <Text style={styles.action}>
          {TREATMENT_STEPS[currentStep].action}
        </Text>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        {currentStep === TREATMENT_STEPS.length - 1 ? (
          <TouchableOpacity 
            style={[styles.navButton, styles.navButtonFinish]}
            onPress={onRestart}
          >
            <Text style={styles.navButtonText}>Finish</Text>
            <MaterialIcons name="check" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  audioToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioLabel: {
    color: '#fff',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },
  stepCount: {
    color: '#FF4136',
    fontSize: 16,
    marginBottom: 10,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  instruction: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 24,
  },
  action: {
    color: '#FF4136',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  navButton: {
    backgroundColor: '#FF4136',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#666',
  },
  navButtonFinish: {
    backgroundColor: '#28a745',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});