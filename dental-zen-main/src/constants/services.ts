import { LucideIcon, Smile, ScanLine, Sparkles, Heart, Shield, Zap } from "lucide-react";

export interface Service {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    price: string;
    why?: string;
    tag?: string;
}

export const SERVICES: Service[] = [
    {
        id: "cosmetic",
        icon: Smile,
        title: "Cosmetic Dentistry",
        description: "Veneers, whitening & smile makeovers",
        price: "From $299",
        why: "A confident smile increases self-esteem by 80% and opens professional doors. Our AI-matched color grading ensures the most natural results.",
        tag: "Most Popular",
    },
    {
        id: "diagnostics",
        icon: ScanLine,
        title: "AI Diagnostics",
        description: "3D scanning & predictive analysis",
        price: "From $149",
        why: "Our AI detects early-stage issues 3x faster than traditional methods, catching problems before they become painful and expensive.",
    },
    {
        id: "whitening",
        icon: Sparkles,
        title: "Teeth Whitening",
        description: "Professional laser whitening in 45 min",
        price: "From $199",
        why: "Clinical-grade whitening delivers 8 shades brighter results compared to 2 shades with over-the-counter products.",
    },
    {
        id: "pediatric",
        icon: Heart,
        title: "Pediatric Care",
        description: "Gentle care for your little ones",
        price: "From $99",
        why: "Children who have positive dental experiences early are 60% more likely to maintain good oral health habits throughout life.",
    },
    {
        id: "implants",
        icon: Shield,
        title: "Dental Implants",
        description: "Permanent, natural-looking replacements",
        price: "From $999",
        why: "Modern implants have a 98% success rate and can last a lifetime with proper care — the gold standard in tooth replacement.",
        tag: "VIP",
    },
    {
        id: "emergency",
        icon: Zap,
        title: "Emergency Care",
        description: "24/7 urgent dental support",
        price: "From $249",
        why: "60% of dental emergencies worsen within 24 hours. Our same-day emergency protocol prevents complications and reduces pain faster.",
    },
];

export const TIME_SLOTS = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];
