import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface AppointmentChartProps {
    data: { service: string; count: number }[];
}

const AppointmentChart = ({ data }: AppointmentChartProps) => {
    return (
        <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Appointments by Service</h3>
                <p className="text-sm text-muted-foreground">Service popularity breakdown</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                        dataKey="service"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                        }}
                        formatter={(value: number) => [value, "Appointments"]}
                    />
                    <Bar
                        dataKey="count"
                        fill="hsl(var(--secondary))"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default AppointmentChart;
