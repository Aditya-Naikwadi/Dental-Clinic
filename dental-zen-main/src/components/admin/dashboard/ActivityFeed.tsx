import { motion } from "framer-motion";
import { Activity } from "@/types/admin";
import { Calendar, XCircle, UserPlus, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityFeedProps {
    activities: Activity[];
}

const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
        case "booking":
            return Calendar;
        case "cancellation":
            return XCircle;
        case "registration":
            return UserPlus;
        case "payment":
            return DollarSign;
        default:
            return Calendar;
    }
};

const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
        case "booking":
            return "text-secondary bg-secondary/10";
        case "cancellation":
            return "text-destructive bg-destructive/10";
        case "registration":
            return "text-blue-500 bg-blue-500/10";
        case "payment":
            return "text-green-500 bg-green-500/10";
        default:
            return "text-muted-foreground bg-muted";
    }
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
    return (
        <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => {
                    const Icon = getActivityIcon(activity.type);
                    const colorClass = getActivityColor(activity.type);

                    return (
                        <motion.div
                            key={activity.id}
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ActivityFeed;
