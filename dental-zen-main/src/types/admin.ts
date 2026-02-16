// Admin Type Definitions

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    serviceId: string;
    serviceName: string;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    amount: number;
    notes?: string;
    createdAt: Date;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: Date;
    address?: string;
    medicalHistory?: string;
    registrationDate: Date;
    lastVisit?: Date;
    totalVisits: number;
    totalSpent: number;
    status: 'active' | 'inactive';
    notes?: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    priceFrom: number;
    priceTo?: number;
    duration: number; // in minutes
    icon: string;
    isActive: boolean;
    popularity: number; // number of bookings
}

export interface Analytics {
    revenue: {
        total: number;
        change: number; // percentage
        byMonth: { month: string; amount: number }[];
        byService: { service: string; amount: number }[];
    };
    appointments: {
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
        byService: { service: string; count: number }[];
        byDay: { day: string; count: number }[];
    };
    patients: {
        total: number;
        new: number;
        returning: number;
        retention: number; // percentage
        byMonth: { month: string; count: number }[];
    };
}

export interface DashboardStats {
    totalRevenue: number;
    revenueChange: number;
    totalAppointments: number;
    appointmentsChange: number;
    activePatients: number;
    patientsChange: number;
    averageRating: number;
    ratingChange: number;
    pendingAppointments: number;
    completionRate: number;
}

export interface Activity {
    id: string;
    type: 'booking' | 'cancellation' | 'registration' | 'payment';
    title: string;
    description: string;
    timestamp: Date;
    icon?: string;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'staff';
    avatar?: string;
}

export interface ClinicSettings {
    name: string;
    address: string;
    phone: string;
    email: string;
    logo?: string;
    businessHours: {
        [key: string]: { open: string; close: string; isOpen: boolean };
    };
}
