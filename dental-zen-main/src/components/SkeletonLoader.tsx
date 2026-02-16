import { motion } from "framer-motion";

interface SkeletonLoaderProps {
    variant?: "text" | "card" | "circle" | "rectangle";
    width?: string;
    height?: string;
    className?: string;
}

const SkeletonLoader = ({
    variant = "text",
    width = "100%",
    height,
    className = "",
}: SkeletonLoaderProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case "text":
                return "h-4 rounded";
            case "card":
                return "h-48 rounded-xl";
            case "circle":
                return "rounded-full aspect-square";
            case "rectangle":
                return "rounded-lg";
            default:
                return "h-4 rounded";
        }
    };

    return (
        <motion.div
            className={`bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:1000px_100%] animate-shimmer ${getVariantStyles()} ${className}`}
            style={{ width, height }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        />
    );
};

export default SkeletonLoader;
