import { useEffect, useState } from "react";
import { getActivity } from "../../api/activityApi";
import { motion } from "framer-motion";
import { History, PlusCircle, Edit3, Trash2, Share2, User } from "lucide-react";
import Card from "../../components/common/Card";
import { formatDistanceToNow } from "date-fns";

const actionIcons = {
  create: { icon: PlusCircle, color: "text-green-500", bg: "bg-green-500/10" },
  update: { icon: Edit3, color: "text-blue-500", bg: "bg-blue-500/10" },
  delete: { icon: Trash2, color: "text-red-500", bg: "bg-red-500/10" },
  share: { icon: Share2, color: "text-purple-500", bg: "bg-purple-500/10" },
};

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const res = await getActivity();
      setActivities(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Activity Log</h1>
        <p className="text-gray-400">Track all actions performed in your workspace</p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass h-20 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : activities.length > 0 ? (
        <div className="relative space-y-6 sm:space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent pb-12">
          {activities.map((activity, index) => {
            const config = actionIcons[activity.action] || actionIcons.update;
            return (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center justify-start md:justify-normal md:odd:flex-row-reverse group gap-4 md:gap-0"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 glass text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                </div>
                
                <div className="flex-grow md:flex-none md:w-[45%] glass p-4 sm:p-5 rounded-2xl group-hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center">
                          <User className="w-3 h-3 text-gray-500" />
                       </div>
                       <span className="text-sm font-bold text-white truncate max-w-[80px] sm:max-w-none">{activity.userName || "User"}</span>
                    </div>
                    <time className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 font-bold whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.createdAt))} ago
                    </time>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="capitalize font-medium text-white">{activity.action}d</span> the note{" "}
                    <span className="text-primary font-medium italic">"{activity.noteTitle || "Unknown Note"}"</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-20 border-dashed border-white/10">
           <History className="w-12 h-12 text-gray-800 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-white mb-2">No activity yet</h3>
           <p className="text-gray-500">Actions will appear here as you interact with notes</p>
        </Card>
      )}
    </div>
  );
}