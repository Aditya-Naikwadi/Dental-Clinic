import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockAppointments } from "@/data/admin/mockAppointments";
import { Appointment } from "@/types/admin";
import { format } from "date-fns";

const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const Appointments = () => {
    const [appointments] = useState<Appointment[]>(mockAppointments);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredAppointments = appointments.filter((apt) => {
        const matchesSearch =
            apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <motion.h1
                        className="text-3xl font-bold text-foreground mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Appointments
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Manage and track all appointments
                    </motion.p>
                </div>
                <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Calendar className="h-5 w-5" />
                    New Appointment
                </motion.button>
            </div>

            {/* Filters */}
            <motion.div
                className="glass-card rounded-2xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by patient or service..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        aria-label="Filter appointments by status"
                        className="px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Export Button */}
                    <motion.button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Download className="h-4 w-4" />
                        <span className="text-sm font-medium">Export</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                className="glass-card rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredAppointments.map((appointment, index) => (
                                <motion.tr
                                    key={appointment.id}
                                    className="hover:bg-muted/30 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-foreground">{appointment.patientName}</div>
                                            <div className="text-xs text-muted-foreground">{appointment.patientEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-foreground">{appointment.serviceName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-foreground">
                                            {format(appointment.date, "MMM dd, yyyy")}
                                        </div>
                                        <div className="text-xs text-muted-foreground">{appointment.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[appointment.status]
                                                }`}
                                        >
                                            {appointment.status === "completed" && <CheckCircle className="h-3 w-3" />}
                                            {appointment.status === "cancelled" && <XCircle className="h-3 w-3" />}
                                            {appointment.status === "pending" && <Clock className="h-3 w-3" />}
                                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-foreground">
                                            ${appointment.amount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <motion.button
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Eye className="h-4 w-4" />
                                            <span className="text-xs font-medium">View</span>
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {filteredAppointments.length} of {appointments.length} appointments
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors text-sm">
                            1
                        </button>
                        <button className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
                            2
                        </button>
                        <button className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
                            Next
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Appointments;
