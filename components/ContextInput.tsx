import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type BleedingSpeed = 'slow' | 'moderate' | 'spurting';
type TimeRange = '0-5 mins' | '5-10 mins' | '10-30 mins' | '30+ mins';

export default function ContextInput({ onComplete }: { onComplete: () => void }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange | null>(null);
  const [bleeding, setBleeding] = useState<BleedingSpeed | null>(null);

  const timeRanges: TimeRange[] = ['0-5 mins', '5-10 mins', '10-30 mins', '30+ mins'];

  const handleComplete = () => {
    if (bleeding && selectedTimeRange) {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Combat Wound Assessment</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Time since injury:</Text>
        <View style={styles.timeRangeContainer}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                selectedTimeRange === range && styles.timeRangeButtonSelected
              ]}
              onPress={() => setSelectedTimeRange(range)}
            >
              <Text style={[
                styles.timeRangeButtonText,
                selectedTimeRange === range && styles.timeRangeButtonTextSelected
              ]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
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
        style={[styles.continueButton, (!bleeding || !selectedTimeRange) && styles.continueButtonDisabled]}
        onPress={handleComplete}
        disabled={!bleeding || !selectedTimeRange}
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
  timeRangeContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  timeRangeButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  timeRangeButtonSelected: {
    backgroundColor: '#1E88E5', // Different color from bleeding buttons
  },
  timeRangeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  timeRangeButtonTextSelected: {
    fontWeight: 'bold',
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
