import { getNotes, deleteNoteDB, initDatabase, NoteDB } from '@/lib/database';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    paddingTop: 40,
    paddingVertical: 16, paddingHorizontal: 24,
    borderBottomWidth: 1, borderBottomColor: '#ddd',
    backgroundColor: '#f2f2f2',
  },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#000' },
  headerSubtitle: { fontSize: 18, color: '#555', marginTop: 2 },
  listContainer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  noteItem: {
    paddingVertical: 12, paddingHorizontal: 14,
    marginVertical: 6, borderRadius: 4,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
  },
  noteTitle: { fontSize: 25, fontWeight: '600', color: '#000', marginBottom: 2 },
  noteStatus: { fontSize: 13, color: '#555', marginBottom: 4 },
  noteDescription: { fontSize: 13, color: '#777', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', gap: 8 },
  viewButton: {
    backgroundColor: '#1976d2', paddingVertical: 6,
    paddingHorizontal: 14, borderRadius: 6,
  },
  viewButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  deleteButton: {
    backgroundColor: '#e53935', paddingVertical: 6,
    paddingHorizontal: 14, borderRadius: 6,
  },
  deleteButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  addButton: {
    backgroundColor: '#000', padding: 12, borderRadius: 6,
    marginHorizontal: 16, marginBottom: 16, marginTop: 8,
  },
  addButtonText: { color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '600' },
  emptyText: { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 14 },
});

export default function NotesListScreen() {
  const [notes, setNotes] = useState<NoteDB[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      initDatabase();
      setNotes(getNotes());
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        deleteNoteDB(id);
        setNotes(getNotes());
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <Text style={styles.headerSubtitle}>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No notes yet. Add one!</Text>}
          renderItem={({ item }: { item: NoteDB }) => (
            <View style={styles.noteItem}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteStatus}>{item.status}</Text>
              {item.description ? <Text style={styles.noteDescription}>{item.description}</Text> : null}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => router.push({ pathname: '/(tabs)/notes/detail', params: { id: item.id } })}
                >
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/(tabs)/notes/add')}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}