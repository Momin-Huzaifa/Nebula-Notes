import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Share2, Users, ChevronLeft, Shield } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../hooks/useAuth";

import CollaboratorsModal from "../modals/CollaboratorsModal";

export default function NoteEditor({ note, onSave, onClose }) {
  const socket = useSocket();
  const { user, isEditor } = useAuth();
  
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [collaborators, setCollaborators] = useState([]);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  // Join/Leave note room
  useEffect(() => {
    if (socket && note?.id) {
      socket.emit("join-note", note.id);
      
      socket.on("note-updated", (data) => {
        if (data.id === note.id) {
          setTitle(data.title);
          setContent(data.content);
        }
      });

      socket.on("collaborators-info", (list) => {
        setCollaborators(list);
      });

      return () => {
        socket.emit("leave-note", note.id);
        socket.off("note-updated");
        socket.off("collaborators-info");
      };
    }
  }, [socket, note?.id]);

  const handleUpdate = useCallback((newTitle, newContent) => {
    setTitle(newTitle);
    setContent(newContent);
    if (socket && note?.id) {
      socket.emit("update-note", { id: note.id, title: newTitle, content: newContent });
    }
  }, [socket, note?.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-xl"
    >
      <Card className="w-full max-w-4xl h-full max-h-[90vh] flex flex-col p-0 overflow-hidden relative shadow-2xl" hover={false}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
               <h2 className="text-xl font-display font-bold text-white leading-tight">
                {note ? "Collab Editor" : "Create New Note"}
              </h2>
              {note && (
                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <Shield className="w-3 h-3 text-primary" /> Owned by {note.ownerName || "You"}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsCollabModalOpen(true)}>
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button 
                variant="primary" 
                size="sm" 
                onClick={() => onSave({ ...note, title, content })} 
                className="gap-2 px-6"
                disabled={!isEditor}
            >
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </div>

        <div className="flex-grow flex flex-col p-5 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <input
            autoFocus
            readOnly={!isEditor}
            className="bg-transparent text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white outline-none placeholder:text-gray-800 mb-6 sm:mb-8 disabled:opacity-50"
            placeholder="Note Title"
            value={title}
            onChange={(e) => handleUpdate(e.target.value, content)}
          />
          
          <textarea
            readOnly={!isEditor}
            className="flex-grow bg-transparent text-base sm:text-lg text-gray-400 outline-none resize-none placeholder:text-gray-800 leading-relaxed disabled:opacity-50 min-h-[200px]"
            placeholder="Start writing..."
            value={content}
            onChange={(e) => handleUpdate(title, e.target.value)}
          />
        </div>

        <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {collaborators.length > 0 ? collaborators.map(c => (
                <div 
                    key={c.id} 
                    className="w-8 h-8 rounded-full border-2 border-surface bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold relative group"
                >
                  {c.name?.charAt(0) || "U"}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    {c.name} is editing...
                  </div>
                </div>
              )) : (
                 <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-700 flex items-center justify-center text-[10px] text-white">
                    {user?.name?.charAt(0)}
                 </div>
              )}
            </div>
            <span className="text-xs text-gray-500 font-medium italic">
                {collaborators.length > 0 ? `${collaborators.length} others editing` : "You are editing alone"}
            </span>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Real-time Sync Active</p>
        </div>
      </Card>

      <CollaboratorsModal 
        isOpen={isCollabModalOpen} 
        onClose={() => setIsCollabModalOpen(false)} 
        note={note}
      />
    </motion.div>
  );
}
