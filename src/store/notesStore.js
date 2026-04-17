import { create } from "zustand";

export const useNotesStore = create((set) => ({
  notes: [],
  filteredNotes: [],
  selectedNote: null,
  isLoading: false,
  error: null,
  searchTerm: "",

  setNotes: (notes) => set({ notes, filteredNotes: notes, isLoading: false }),
  
  setSelectedNote: (note) => set({ selectedNote: note }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSearchTerm: (term) => set((state) => {
    const filtered = state.notes.filter(note => 
      note.title.toLowerCase().includes(term.toLowerCase()) || 
      note.content?.toLowerCase().includes(term.toLowerCase())
    );
    return { searchTerm: term, filteredNotes: filtered };
  }),

  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
      filteredNotes: [note, ...state.filteredNotes]
    })),

  updateNoteStore: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
      filteredNotes: state.filteredNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
    })),

  deleteNoteStore: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      filteredNotes: state.filteredNotes.filter((n) => n.id !== id),
    })),
}));