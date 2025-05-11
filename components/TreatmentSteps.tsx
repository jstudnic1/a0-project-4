import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to speak the current step
  const speakCurrentStep = async () => {
    if (!audioEnabled) return;

    // Stop any ongoing speech
    await Speech.stop();

    // Prepare text to speak
    const currentStepData = TREATMENT_STEPS[currentStep];
    const textToSpeak = `${currentStepData.title}. ${currentStepData.instruction} ${currentStepData.action}`;

    setIsSpeaking(true);

    try {
      await Speech.speak(textToSpeak, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    } catch (error) {
      console.error('Failed to speak:', error);
      setIsSpeaking(false);
    }
  };

  // Speak when the current step changes or audio is enabled
  useEffect(() => {
    speakCurrentStep();

    // Cleanup
    return () => {
      Speech.stop();
    };
  }, [currentStep, audioEnabled]);

  // Handle audio toggle
  const handleAudioToggle = (value: boolean) => {
    setAudioEnabled(value);
    if (!value) {
      Speech.stop();
    }
  };

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

  const handleDone = () => {
    if (currentStep === TREATMENT_STEPS.length - 1) {
      onRestart();
    } else {
      handleNext();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Treatment Steps</Text>
        <View style={styles.audioToggleContainer}>
          <Switch
            value={audioEnabled}
            onValueChange={handleAudioToggle}
            trackColor={{ false: '#666', true: '#FF4136' }}
          />
          <Text style={styles.audioLabel}>
            {isSpeaking ? 'Speaking...' : 'Read Aloud'}
          </Text>
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

        <View style={styles.voiceCommandContainer}>
          <Text style={styles.voiceCommandsTitle}>Voice Commands:</Text>
          <View style={styles.voiceCommandButtons}>
            <TouchableOpacity
              style={[styles.voiceButton, currentStep === 0 && styles.voiceButtonDisabled]}
              onPress={handlePrevious}
              disabled={currentStep === 0}
            >
              <Text style={styles.voiceButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.voiceButton}
              onPress={handleNext}
              disabled={currentStep === TREATMENT_STEPS.length - 1}
            >
              <Text style={styles.voiceButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.voiceButton, styles.doneButton]}
              onPress={handleDone}
            >
              <Text style={styles.voiceButtonText}>
                {currentStep === TREATMENT_STEPS.length - 1 ? 'Finish' : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  audioToggleContainer: {
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
    marginVertical: 5,
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
    marginBottom: 15,
  },
  voiceCommandContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  voiceCommandsTitle: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  voiceCommandButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  voiceButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    marginBottom: 8,
  },
  voiceButtonDisabled: {
    backgroundColor: '#666',
  },
  doneButton: {
    backgroundColor: '#FF9800',
  },
  voiceButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
