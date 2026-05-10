export interface Note {
  id: string;
  title: string;
  category: string;
  description?: string;
  createdAt?: string;
}

export const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Morning reflection",
    category: "Personal",
    description: "Capture quiet thoughts and intentions for the day.",
    createdAt: "2024-04-15"
  },
  {
    id: "2",
    title: "Pantry restock plan",
    category: "Personal",
    description: "Milk, bread, herbs, fresh produce.",
    createdAt: "2024-04-16"
  },
  {
    id: "3",
    title: "Creative idea notes",
    category: "Ideas",
    description: "Jot down inspiration for future projects.",
    createdAt: "2024-04-18"
  }
];

export default SAMPLE_NOTES;
