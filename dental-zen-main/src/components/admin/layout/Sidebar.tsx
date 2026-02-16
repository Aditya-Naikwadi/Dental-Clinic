import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Stethoscope,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Calendar, label: "Appointments", path: "/admin/appointments" },
    { icon: Users, label: "Patients", path: "/admin/patients" },
    { icon: Stethoscope, label: "Services", path: "/admin/services" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <motion.aside
            className="glass-card border-r border-border flex flex-col"
            initial={false}
            animate={{ width: collapsed ? 80 : 240 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <motion.div
                    className="flex items-center gap-3"
                    animate={{ justifyContent: collapsed ? "center" : "flex-start" }}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-bold text-lg">
                        D
                    </div>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h1 className="text-lg font-bold font-display">
                                Dental<span className="text-secondary">Clinic</span>
                            </h1>
                            <p className="text-xs text-muted-foreground">Admin Panel</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? "bg-secondary text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                {!collapsed && (
                                    <motion.span
                                        className="font-medium"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Toggle button */}
            <div className="p-4 border-t border-border">
                <motion.button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {collapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <>
                            <ChevronLeft className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">Collapse</span>
                        </>
                    )}
                </motion.button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
