import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("database2.db");

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
}

export type NoteDB = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: string;
}

export function initDatabase() {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        createdAt TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending'
      );
    `);
  } catch (error) {
    console.error("There were problems initializing the database", error);
    throw error;
  }
}

export function addTask(title: string, description: string, status: string) {
  try {
    db.runSync('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
  } catch (error) {
    console.error("Errors adding task", error);
    throw error;
  }
}

export function deleteTask(id: number) {
  try {
    db.runSync('DELETE FROM tasks WHERE id = ?', [id]);
  } catch (error) {
    console.error("Errors deleting task", error);
    throw error;
  }
}

export function getTasks(): Task[] {
  try {
    return db.getAllSync<Task>('SELECT * FROM tasks');
  } catch (error) {
    console.error("Errors fetching tasks", error);
    throw error;
  }
}

export function addNoteDB(note: NoteDB) {
  try {
    db.runSync(
      'INSERT INTO notes (id, title, description, createdAt, status) VALUES (?, ?, ?, ?, ?)',
      [note.id, note.title, note.description, note.createdAt, note.status]
    );
  } catch (error) {
    console.error("Errors adding note", error);
    throw error;
  }
}

export function deleteNoteDB(id: string) {
  try {
    db.runSync('DELETE FROM notes WHERE id = ?', [id]);
  } catch (error) {
    console.error("Errors deleting note", error);
    throw error;
  }
}

export function updateNoteStatusDB(id: string, status: string) {
  try {
    db.runSync('UPDATE notes SET status = ? WHERE id = ?', [status, id]);
  } catch (error) {
    console.error("Errors updating note status", error);
    throw error;
  }
}

export function updateNoteDB(id: string, title: string, description: string, status: string) {
  try {
    db.runSync(
      'UPDATE notes SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );
  } catch (error) {
    console.error("Errors updating note", error);
    throw error;
  }
}

export function getNotes(): NoteDB[] {
  try {
    return db.getAllSync<NoteDB>('SELECT * FROM notes');
  } catch (error) {
    console.error("Errors fetching notes", error);
    throw error;
  }
}