import { motion } from "framer-motion";
import { DollarSign, Calendar, Users, Star, Clock, TrendingUp } from "lucide-react";
import StatCard from "@/components/admin/dashboard/StatCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import AppointmentChart from "@/components/admin/dashboard/AppointmentChart";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";
import { mockDashboardStats, mockAnalytics, mockActivities } from "@/data/admin/mockAnalytics";

const Dashboard = () => {
    const stats = mockDashboardStats;
    const analytics = mockAnalytics;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <motion.h1
                    className="text-3xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Dashboard
                </motion.h1>
                <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Welcome back! Here's what's happening today.
                </motion.p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    change={stats.revenueChange}
                    trend="up"
                    icon={DollarSign}
                />
                <StatCard
                    title="Total Appointments"
                    value={stats.totalAppointments}
                    change={stats.appointmentsChange}
                    trend="up"
                    icon={Calendar}
                    subtitle={`${stats.pendingAppointments} pending`}
                />
                <StatCard
                    title="Active Patients"
                    value={stats.activePatients}
                    change={stats.patientsChange}
                    trend="up"
                    icon={Users}
                />
                <StatCard
                    title="Average Rating"
                    value={stats.averageRating.toFixed(1)}
                    change={stats.ratingChange}
                    trend="up"
                    icon={Star}
                />
                <StatCard
                    title="Completion Rate"
                    value={`${stats.completionRate}%`}
                    icon={TrendingUp}
                />
                <StatCard
                    title="Pending Appointments"
                    value={stats.pendingAppointments}
                    icon={Clock}
                    subtitle="Awaiting confirmation"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <RevenueChart data={analytics.revenue.byMonth} />
                <AppointmentChart data={analytics.appointments.byService} />
            </div>

            {/* Activity Feed and Quick Actions */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ActivityFeed activities={mockActivities} />
                </div>

                {/* Quick Actions */}
                <motion.div
                    className="glass-card rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <motion.button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Calendar className="h-5 w-5" />
                            New Appointment
                        </motion.button>
                        <motion.button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Users className="h-5 w-5" />
                            Add Patient
                        </motion.button>
                        <motion.button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Clock className="h-5 w-5" />
                            Today's Schedule
                        </motion.button>
                        <motion.button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <TrendingUp className="h-5 w-5" />
                            Generate Report
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
