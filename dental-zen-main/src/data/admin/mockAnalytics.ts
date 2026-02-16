import { Analytics, DashboardStats, Activity } from "@/types/admin";

// Mock analytics data
export const mockAnalytics: Analytics = {
    revenue: {
        total: 125450,
        change: 12.5,
        byMonth: [
            { month: "Jan", amount: 8500 },
            { month: "Feb", amount: 9200 },
            { month: "Mar", amount: 10100 },
            { month: "Apr", amount: 9800 },
            { month: "May", amount: 11200 },
            { month: "Jun", amount: 10500 },
            { month: "Jul", amount: 12100 },
            { month: "Aug", amount: 11800 },
            { month: "Sep", amount: 10900 },
            { month: "Oct", amount: 11500 },
            { month: "Nov", amount: 10200 },
            { month: "Dec", amount: 9650 },
        ],
        byService: [
            { service: "Cosmetic Dentistry", amount: 35200 },
            { service: "Dental Implants", amount: 28500 },
            { service: "Teeth Whitening", amount: 22100 },
            { service: "AI Diagnostics", amount: 18400 },
            { service: "Pediatric Care", amount: 12250 },
            { service: "Emergency Care", amount: 9000 },
        ],
    },
    appointments: {
        total: 856,
        pending: 24,
        confirmed: 48,
        completed: 752,
        cancelled: 32,
        byService: [
            { service: "Cosmetic Dentistry", count: 185 },
            { service: "Teeth Whitening", count: 165 },
            { service: "AI Diagnostics", count: 142 },
            { service: "Dental Implants", count: 128 },
            { service: "Pediatric Care", count: 124 },
            { service: "Emergency Care", count: 112 },
        ],
        byDay: [
            { day: "Mon", count: 145 },
            { day: "Tue", count: 152 },
            { day: "Wed", count: 138 },
            { day: "Thu", count: 148 },
            { day: "Fri", count: 142 },
            { day: "Sat", count: 98 },
            { day: "Sun", count: 33 },
        ],
    },
    patients: {
        total: 342,
        new: 45,
        returning: 297,
        retention: 86.8,
        byMonth: [
            { month: "Jan", count: 28 },
            { month: "Feb", count: 32 },
            { month: "Mar", count: 35 },
            { month: "Apr", count: 30 },
            { month: "May", count: 38 },
            { month: "Jun", count: 34 },
            { month: "Jul", count: 40 },
            { month: "Aug", count: 36 },
            { month: "Sep", count: 33 },
            { month: "Oct", count: 37 },
            { month: "Nov", count: 31 },
            { month: "Dec", count: 29 },
        ],
    },
};

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
    totalRevenue: 125450,
    revenueChange: 12.5,
    totalAppointments: 856,
    appointmentsChange: 8.3,
    activePatients: 342,
    patientsChange: 15.2,
    averageRating: 4.9,
    ratingChange: 2.1,
    pendingAppointments: 24,
    completionRate: 87.9,
};

// Mock activity feed
export const mockActivities: Activity[] = [
    {
        id: "act-001",
        type: "booking",
        title: "New Appointment",
        description: "Sarah Johnson booked Teeth Whitening for Feb 20",
        timestamp: new Date(2026, 1, 17, 10, 30),
    },
    {
        id: "act-002",
        type: "payment",
        title: "Payment Received",
        description: "$249 from James Wilson for Emergency Care",
        timestamp: new Date(2026, 1, 17, 9, 15),
    },
    {
        id: "act-003",
        type: "registration",
        title: "New Patient",
        description: "Robert Taylor registered as a new patient",
        timestamp: new Date(2026, 1, 17, 8, 45),
    },
    {
        id: "act-004",
        type: "cancellation",
        title: "Appointment Cancelled",
        description: "Lisa Anderson cancelled Pediatric Care appointment",
        timestamp: new Date(2026, 1, 16, 16, 20),
    },
    {
        id: "act-005",
        type: "booking",
        title: "New Appointment",
        description: "Michael Chen booked Dental Implants for Feb 20",
        timestamp: new Date(2026, 1, 16, 14, 10),
    },
    {
        id: "act-006",
        type: "payment",
        title: "Payment Received",
        description: "$149 from Emily Rodriguez for AI Diagnostics",
        timestamp: new Date(2026, 1, 16, 11, 30),
    },
];
