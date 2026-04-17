import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Shield, User, Trash2 } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";

export default function CollaboratorsModal({ note, isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/60 backdrop-blur-md">
      <Card className="w-full max-w-md p-6 relative overflow-hidden" hover={false}>
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
             </div>
             <div>
                <h3 className="text-lg font-display font-bold text-white">Manage Access</h3>
                <p className="text-xs text-gray-400">Collaborate with your team</p>
             </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-4 h-4" />
          </Button>
        </header>

        <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); alert("Invite sent!"); }}>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow">
               <Input 
                placeholder="colleague@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="py-2.5 sm:py-2"
              />
            </div>
            <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="glass rounded-xl px-3 py-2.5 sm:py-0 text-xs font-bold uppercase tracking-wider text-gray-300 outline-none"
            >
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
          </div>
          <Button className="w-full gap-2 py-2.5 sm:py-2" size="sm">
            <UserPlus className="w-4 h-4" /> Invite Member
          </Button>
        </form>

        <div className="space-y-2 sm:space-y-3 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2 sm:mb-4 px-1">Active Collaborators</h4>
            {note?.collaborators?.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 glass rounded-xl group hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                            {c.name?.charAt(0) || "U"}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-none">{c.name || "Anonymous"}</p>
                            <p className="text-[10px] text-gray-500">{c.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="text-[9px] font-bold uppercase tracking-tighter bg-white/5 px-2 py-1 rounded text-gray-400 italic">
                            {c.role || "Editor"}
                         </span>
                         <button className="p-1.5 text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                         </button>
                    </div>
                </div>
            ))}
            {(!note?.collaborators || note?.collaborators.length === 0) && (
                <div className="text-center py-6 text-gray-700 italic text-sm">
                    No collaborators yet
                </div>
            )}
        </div>
      </Card>
    </div>
  );
}
