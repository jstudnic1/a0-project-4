import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type MedKitItem = {
  id: string;
  name: string;
  quantity: number;
  critical: number; // Minimum quantity before warning
};

const initialInventory: MedKitItem[] = [
  { id: '1', name: 'Combat Gauze', quantity: 3, critical: 2 },
  { id: '2', name: 'Pressure Dressing', quantity: 2, critical: 1 },
  { id: '3', name: 'Tourniquet', quantity: 4, critical: 2 },
  { id: '4', name: 'Chest Seal', quantity: 2, critical: 1 },
  { id: '5', name: 'Medical Tape', quantity: 3, critical: 1 },
  { id: '6', name: 'Trauma Shears', quantity: 1, critical: 1 },
  { id: '7', name: 'NPA', quantity: 2, critical: 1 }
];

export default function InventoryScreen() {
  const [inventory, setInventory] = useState<MedKitItem[]>(initialInventory);
  const navigation = useNavigation();

  const updateQuantity = (id: string, change: number) => {
    setInventory(current =>
      current.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Med-Kit Inventory</Text>
      </View>

      <ScrollView style={styles.list}>
        {inventory.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={[
                styles.itemQuantity,
                item.quantity <= item.critical && styles.itemCritical
              ]}>
                {item.quantity} remaining
              </Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => updateQuantity(item.id, -1)}
                disabled={item.quantity === 0}
              >
                <MaterialIcons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  itemCritical: {
    color: '#FF4136',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF4136',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
});