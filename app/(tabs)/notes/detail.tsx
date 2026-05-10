import { getNotes, NoteDB } from '@/lib/database';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  contentContainer: { paddingHorizontal: 24, paddingVertical: 24 },
  notFoundContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFoundText: { fontSize: 14, color: '#aaa' },
  section: { marginBottom: 20 },
  label: { fontSize: 13, color: '#555', marginBottom: 4 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  detailText: { fontSize: 15, color: '#333', lineHeight: 22 },
  date: { fontSize: 13, color: '#aaa', marginTop: 2 },
  editButton: {
    backgroundColor: '#1976d2', padding: 12,
    borderRadius: 6, marginTop: 8,
  },
  editButtonText: { color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '600' },
});

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const notes: NoteDB[] = getNotes();
  const note = notes.find((n: NoteDB) => n.id === (typeof id === 'string' ? id : id?.[0] || ''));

  if (!note) {
    return (
      <View style={[styles.container, styles.notFoundContainer]}>
        <Text style={styles.notFoundText}>Note not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.title}>{note.title}</Text>
          {note.createdAt ? <Text style={styles.date}>{note.createdAt}</Text> : null}
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.detailText}>{note.description || 'No description.'}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.detailText}>{note.status}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push({ pathname: '/notes/edit', params: { id: note.id } })}
        >
          <Text style={styles.editButtonText}>Edit Note</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}