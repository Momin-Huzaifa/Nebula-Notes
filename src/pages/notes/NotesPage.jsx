import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../../api/notesApi";
import { logActivity } from "../../api/activityApi";
import { useAuth } from "../../hooks/useAuth";
import { useNotesStore } from "../../store/notesStore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, FileText } from "lucide-react";
import NoteCard from "../../components/notes/NoteCard";
import NoteEditor from "../../components/notes/NoteEditor";
import Button from "../../components/common/Button";

export default function NotesPage() {
  const { user } = useAuth();
  const { filteredNotes, setNotes, addNote, updateNoteStore, deleteNoteStore, isLoading, setLoading, searchTerm, setSearchTerm } = useNotesStore();
  const [editingNote, setEditingNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLog = async (action, note) => {
    try {
      await logActivity({
        action,
        userName: user?.name,
        noteTitle: note.title,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to log activity:", err);
    }
  };

  const handleSave = async (noteData) => {
    try {
      if (noteData.id) {
        const res = await updateNote(noteData.id, noteData);
        updateNoteStore(res.data);
        handleLog("update", res.data);
      } else {
        const res = await createNote(noteData);
        addNote(res.data);
        handleLog("create", res.data);
      }
      setIsEditorOpen(false);
      setEditingNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const noteToDelete = filteredNotes.find(n => n.id === id);
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        deleteNoteStore(id);
        if (noteToDelete) handleLog("delete", noteToDelete);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">My Notes</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage and collaborate on your ideas</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="glass w-full pl-10 pr-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => { setEditingNote(null); setIsEditorOpen(true); }} className="gap-2 whitespace-nowrap py-2.5 sm:py-2">
            <Plus className="w-5 h-5" /> <span className="sm:inline">New Note</span>
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass rounded-2xl h-64 animate-pulse bg-white/5" />
          ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <NoteCard
                  note={note}
                  onEdit={(n) => { setEditingNote(n); setIsEditorOpen(true); }}
                  onDelete={handleDelete}
                  onShare={(n) => {
                    alert("Sharing link generated!");
                    handleLog("share", n);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl border-dashed border-white/10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-700" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No notes found</h3>
          <p className="text-gray-500">Try adjusting your search or create a new note</p>
        </div>
      )}

      <AnimatePresence>
        {isEditorOpen && (
          <NoteEditor
            note={editingNote}
            onSave={handleSave}
            onClose={() => { setIsEditorOpen(false); setEditingNote(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}