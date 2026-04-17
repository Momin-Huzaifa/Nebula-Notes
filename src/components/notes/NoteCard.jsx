import { motion } from "framer-motion";
import { FileText, Clock, Users, Trash2, Edit3, Share2 } from "lucide-react";
import Card from "../common/Card";
import { formatDistanceToNow } from "date-fns";

export default function NoteCard({ note, onEdit, onDelete, onShare }) {
  return (
    <Card className="flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onShare(note)}
            className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onEdit(note)}
            className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{note.title}</h3>
      <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
        {note.content || "No content provided..."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          <Clock className="w-3 h-3" />
          {note.updatedAt ? formatDistanceToNow(new Date(note.updatedAt)) : "Just now"}
        </div>
        {note.collaborators?.length > 0 && (
          <div className="flex -space-x-2">
            {note.collaborators.slice(0, 3).map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-indigo-500 flex items-center justify-center text-[8px] text-white">
                C
              </div>
            ))}
            {note.collaborators.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-surface bg-gray-800 flex items-center justify-center text-[8px] text-white">
                +{note.collaborators.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}