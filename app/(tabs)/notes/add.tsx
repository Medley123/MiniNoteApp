import { addNoteDB } from '@/lib/database';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const STATUSES = ['Pending', 'Ongoing', 'Done'] as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  keyboardView: { flex: 1 },
  content: { paddingHorizontal: 24, paddingVertical: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  inputLabel: { fontSize: 13, color: '#555', marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    paddingHorizontal: 12, paddingVertical: 10,
    borderRadius: 4, fontSize: 15,
    backgroundColor: '#fff', color: '#000',
  },
  descriptionInput: { minHeight: 80, textAlignVertical: 'top' },
  statusRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  statusBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 4,
    borderWidth: 1, borderColor: '#ccc',
    backgroundColor: '#fff', alignItems: 'center',
  },
  statusBtnActive: { backgroundColor: '#000', borderColor: '#000' },
  statusBtnText: { fontSize: 13, color: '#555', fontWeight: '500' },
  statusBtnTextActive: { color: '#fff', fontWeight: '700' },
  buttonContainer: { marginTop: 24 },
  saveButton: { backgroundColor: '#000', padding: 12, borderRadius: 6 },
  cancelButton: {
    backgroundColor: '#fff', padding: 12, borderRadius: 6,
    borderWidth: 1, borderColor: '#ccc', marginTop: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '600' },
  cancelButtonText: { color: '#555', textAlign: 'center', fontSize: 15 },
});

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Pending' | 'Ongoing' | 'Done'>('Pending');
  const router = useRouter();

  const handleSave = () => {
    try {
      if (!title.trim()) {
        throw new Error('Title is required.');
      }
      const newNote = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString().split('T')[0],
        status,
      };
      addNoteDB(newNote);
      Alert.alert('Success', 'Note saved successfully!');
      router.replace('/(tabs)/notes/list');
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Failed to save note.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Add Note</Text>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            placeholder="Enter note title..."
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            placeholder="Write your thoughts here..."
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.descriptionInput]}
            multiline
            placeholderTextColor="#aaa"
          />
          <Text style={styles.inputLabel}>Status</Text>
          <View style={styles.statusRow}>
            {STATUSES.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.statusBtn, status === s && styles.statusBtnActive]}
                onPress={() => setStatus(s)}
              >
                <Text style={[styles.statusBtnText, status === s && styles.statusBtnTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save Note</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}