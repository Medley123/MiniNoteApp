import { Stack } from 'expo-router';

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ title: 'My Notes', headerShown: false }} />
      <Stack.Screen name="add" options={{ title: 'Add Note', headerShown: false }} />
      <Stack.Screen name="detail" options={{ title: 'Note Details' , headerShown: false }} />
      <Stack.Screen name="edit" options={{ title: 'Edit Note' , headerShown: false }} />
    </Stack>
  );
}