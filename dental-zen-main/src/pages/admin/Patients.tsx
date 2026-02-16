import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Download, Eye, Mail, Phone } from "lucide-react";
import { mockPatients } from "@/data/admin/mockPatients";
import { Patient } from "@/types/admin";
import { format } from "date-fns";

const Patients = () => {
    const [patients] = useState<Patient[]>(mockPatients);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredPatients = patients.filter((patient) => {
        const matchesSearch =
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
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
                        Patients
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Manage patient records and history
                    </motion.p>
                </div>
                <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <UserPlus className="h-5 w-5" />
                    Add Patient
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
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        aria-label="Filter patients by status"
                        className="px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    >
                        <option value="all">All Patients</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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
                                    Contact
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Last Visit
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Total Visits
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Total Spent
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredPatients.map((patient, index) => (
                                <motion.tr
                                    key={patient.id}
                                    className="hover:bg-muted/30 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary font-semibold">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-foreground">{patient.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    ID: {patient.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                {patient.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Phone className="h-3 w-3" />
                                                {patient.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-foreground">
                                            {patient.lastVisit ? format(patient.lastVisit, "MMM dd, yyyy") : "Never"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-foreground">
                                            {patient.totalVisits}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-foreground">
                                            ${patient.totalSpent.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${patient.status === "active"
                                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                : "bg-muted text-muted-foreground border-border"
                                                }`}
                                        >
                                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                                        </span>
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
                        Showing {filteredPatients.length} of {patients.length} patients
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors text-sm">
                            1
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

export default Patients;
