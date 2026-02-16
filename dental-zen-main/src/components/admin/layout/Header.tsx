import { motion } from "framer-motion";
import { Bell, Search, User, LogOut } from "lucide-react";
import { useState } from "react";

const Header = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="glass-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search patients, appointments..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <motion.button
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                    </motion.button>

                    {/* User menu */}
                    <div className="relative">
                        <motion.button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-3 rounded-xl bg-muted px-3 py-2 hover:bg-muted/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold text-sm">
                                A
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-semibold">Admin User</p>
                                <p className="text-xs text-muted-foreground">admin@clinic.com</p>
                            </div>
                        </motion.button>

                        {/* Dropdown */}
                        {showUserMenu && (
                            <motion.div
                                className="absolute right-0 mt-2 w-48 rounded-xl glass-card border border-border shadow-lg overflow-hidden z-50"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted transition-colors text-left">
                                    <User className="h-4 w-4" />
                                    <span className="text-sm">Profile</span>
                                </button>
                                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted transition-colors text-left border-t border-border text-destructive">
                                    <LogOut className="h-4 w-4" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
