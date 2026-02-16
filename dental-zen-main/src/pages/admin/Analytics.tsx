import { motion } from "framer-motion";

const Analytics = () => {
    return (
        <div className="space-y-6">
            <div>
                <motion.h1
                    className="text-3xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Analytics
                </motion.h1>
                <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Detailed reports and insights
                </motion.p>
            </div>

            <motion.div
                className="glass-card rounded-2xl p-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="text-muted-foreground">Advanced analytics coming soon...</p>
            </motion.div>
        </div>
    );
};

export default Analytics;
