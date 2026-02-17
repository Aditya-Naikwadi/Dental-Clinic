import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";

const AdminLayout = ({ children }: { children?: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Mobile Sidebar (Sheet) */}
            <div className="lg:hidden">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetContent side="left" className="p-0 w-[240px]">
                        <Sidebar onNavigate={() => setSidebarOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
