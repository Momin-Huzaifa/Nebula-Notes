import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNote } from "../../api/notesApi";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Shield } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export default function SharedNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async () => {
    try {
      const res = await getNote(id);
      setNote(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-xl mx-auto text-center px-6 py-20">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Note Not Found</h1>
        <p className="text-gray-400 mb-8">This note may have been deleted or the link is invalid.</p>
        <Link to="/">
          <Button variant="secondary">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Public View</h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold uppercase tracking-wider">
              <Shield className="w-3 h-3 text-amber-500/50" /> Read-Only Access
            </div>
          </div>
        </div>
        
        <Link to="/login">
            <Button variant="ghost" size="sm">Sign in to collaborate</Button>
        </Link>
      </div>

      <Card className="p-8 sm:p-12 min-h-[60vh] flex flex-col" hover={false}>
        <h2 className="text-4xl font-display font-bold text-white mb-10">{note.title}</h2>
        <div className="text-lg text-gray-400 leading-relaxed whitespace-pre-wrap">
          {note.content}
        </div>
      </Card>
      
      <footer className="mt-12 text-center text-gray-600 text-sm">
        Powered by <span className="text-white font-display font-bold">Nebula Notes</span>
      </footer>
    </div>
  );
}