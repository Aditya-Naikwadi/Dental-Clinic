import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";


interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: LucideIcon;
    trend?: "up" | "down";
    subtitle?: string;
}

const StatCard = ({ title, value, change, icon: Icon, trend, subtitle }: StatCardProps) => {
    return (
        <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-foreground">{value}</h3>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                    )}
                </div>
                <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <Icon className="h-6 w-6" />
                </motion.div>
            </div>

            {change !== undefined && (
                <div className="flex items-center gap-2">
                    <span
                        className={`text-sm font-semibold ${trend === "up" ? "text-green-500" : "text-destructive"
                            }`}
                    >
                        {change > 0 ? "+" : ""}
                        {change}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
            )}
        </motion.div>
    );
};

export default StatCard;
