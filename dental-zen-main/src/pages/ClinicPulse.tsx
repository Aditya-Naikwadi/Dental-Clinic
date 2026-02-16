import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Users, Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";

// Mock data
const moodOverTime = [
  { month: "Jan", score: 4.2, reviews: 42 },
  { month: "Feb", score: 4.4, reviews: 38 },
  { month: "Mar", score: 4.1, reviews: 55 },
  { month: "Apr", score: 4.6, reviews: 61 },
  { month: "May", score: 4.7, reviews: 48 },
  { month: "Jun", score: 4.8, reviews: 72 },
  { month: "Jul", score: 4.5, reviews: 65 },
  { month: "Aug", score: 4.9, reviews: 80 },
];

const sentimentBreakdown = [
  { name: "Very Happy", value: 58, fill: "hsl(160, 70%, 45%)" },
  { name: "Happy", value: 25, fill: "hsl(173, 68%, 50%)" },
  { name: "Neutral", value: 10, fill: "hsl(46, 67%, 52%)" },
  { name: "Unhappy", value: 5, fill: "hsl(15, 70%, 55%)" },
  { name: "Very Unhappy", value: 2, fill: "hsl(0, 70%, 50%)" },
];

const serviceRatings = [
  { service: "Cosmetic", rating: 4.9, reviews: 120, sentiment: "positive" },
  { service: "Implants", rating: 4.8, reviews: 85, sentiment: "positive" },
  { service: "Whitening", rating: 4.7, reviews: 95, sentiment: "positive" },
  { service: "Pediatric", rating: 4.6, reviews: 60, sentiment: "positive" },
  { service: "Emergency", rating: 4.3, reviews: 45, sentiment: "neutral" },
  { service: "Diagnostics", rating: 4.5, reviews: 70, sentiment: "positive" },
];

const heatmapData = [
  { day: "Mon", "8am": 4.8, "10am": 4.5, "12pm": 4.2, "2pm": 4.6, "4pm": 4.9 },
  { day: "Tue", "8am": 4.3, "10am": 4.7, "12pm": 4.1, "2pm": 4.4, "4pm": 4.6 },
  { day: "Wed", "8am": 4.9, "10am": 4.8, "12pm": 4.5, "2pm": 4.7, "4pm": 4.8 },
  { day: "Thu", "8am": 4.4, "10am": 4.2, "12pm": 3.9, "2pm": 4.3, "4pm": 4.5 },
  { day: "Fri", "8am": 4.7, "10am": 4.6, "12pm": 4.4, "2pm": 4.8, "4pm": 4.9 },
  { day: "Sat", "8am": 4.5, "10am": 4.9, "12pm": 4.7, "2pm": 4.6, "4pm": 0 },
];

const recentFeedback = [
  { patient: "Sarah M.", rating: 5, comment: "Incredible experience with the AI diagnostics!", time: "2h ago", sentiment: "positive" },
  { patient: "James K.", rating: 5, comment: "Best dental implants I've ever had.", time: "5h ago", sentiment: "positive" },
  { patient: "Anonymous", rating: 3, comment: "Wait time was a bit long today.", time: "1d ago", sentiment: "neutral" },
  { patient: "Emily R.", rating: 5, comment: "My kids loved the pediatric team!", time: "1d ago", sentiment: "positive" },
  { patient: "Michael T.", rating: 4, comment: "Great whitening results, minor sensitivity.", time: "2d ago", sentiment: "neutral" },
];

const moodGauge = [{ name: "Mood", value: 92, fill: "hsl(173, 68%, 50%)" }];

const getHeatColor = (val: number) => {
  if (val === 0) return "bg-muted/30";
  if (val >= 4.7) return "bg-secondary/70";
  if (val >= 4.4) return "bg-secondary/40";
  if (val >= 4.0) return "bg-accent/40";
  return "bg-destructive/40";
};

const getSentimentColor = (s: string) =>
  s === "positive" ? "text-secondary" : s === "neutral" ? "text-accent" : "text-destructive";

const stats = [
  { label: "Overall Mood", value: "4.7/5", icon: Star, trend: "+0.3", up: true },
  { label: "Total Reviews", value: "512", icon: MessageSquare, trend: "+28", up: true },
  { label: "Satisfaction", value: "92%", icon: ThumbsUp, trend: "+5%", up: true },
  { label: "Active Patients", value: "1,847", icon: Users, trend: "+124", up: true },
];

const ClinicPulse = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground font-display">Clinic Pulse</h1>
              <p className="text-sm text-muted-foreground">Sentiment Analysis Dashboard</p>
            </div>
          </div>
          <span className="rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">Owner View</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${s.up ? "text-secondary" : "text-destructive"}`}>
                  {s.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {s.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Mood Over Time */}
          <motion.div
            className="glass-card rounded-xl p-6 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-1 text-lg font-semibold text-foreground">Patient Mood Trend</h3>
            <p className="mb-6 text-sm text-muted-foreground">Average satisfaction score over time</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={moodOverTime}>
                <defs>
                  <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(173, 68%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(173, 68%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(196, 15%, 45%)" }} />
                <YAxis domain={[3.5, 5]} tick={{ fontSize: 12, fill: "hsl(196, 15%, 45%)" }} />
                <Tooltip
                  contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(200, 15%, 90%)", borderRadius: 12 }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(173, 68%, 50%)" strokeWidth={3} fill="url(#moodGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Mood Gauge */}
          <motion.div
            className="glass-card rounded-xl p-6 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="mb-1 text-lg font-semibold text-foreground">Patient Mood Meter</h3>
            <p className="mb-4 text-sm text-muted-foreground">Current satisfaction level</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" startAngle={180} endAngle={0} data={moodGauge} barSize={20}>
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "hsl(200, 15%, 93%)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-16 text-center">
              <div className="text-4xl font-bold text-secondary">92%</div>
              <div className="text-sm text-muted-foreground">Happy Patients</div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Sentiment Breakdown */}
          <motion.div
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-1 text-lg font-semibold text-foreground">Sentiment Breakdown</h3>
            <p className="mb-6 text-sm text-muted-foreground">Distribution of patient emotions</p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={sentimentBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                  {sentimentBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(200, 15%, 90%)", borderRadius: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {sentimentBreakdown.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.fill }} />
                  {s.name} ({s.value}%)
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Ratings Bar */}
          <motion.div
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-1 text-lg font-semibold text-foreground">Service Ratings</h3>
            <p className="mb-6 text-sm text-muted-foreground">Average rating per service category</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={serviceRatings} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 90%)" horizontal={false} />
                <XAxis type="number" domain={[3.5, 5]} tick={{ fontSize: 12, fill: "hsl(196, 15%, 45%)" }} />
                <YAxis dataKey="service" type="category" tick={{ fontSize: 12, fill: "hsl(196, 15%, 45%)" }} width={80} />
                <Tooltip
                  contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(200, 15%, 90%)", borderRadius: 12 }}
                />
                <Bar dataKey="rating" radius={[0, 6, 6, 0]} barSize={24}>
                  {serviceRatings.map((entry, i) => (
                    <Cell key={i} fill={entry.rating >= 4.7 ? "hsl(173, 68%, 50%)" : entry.rating >= 4.4 ? "hsl(173, 68%, 65%)" : "hsl(46, 67%, 52%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Heatmap */}
        <motion.div
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-1 text-lg font-semibold text-foreground">Satisfaction Heatmap</h3>
          <p className="mb-6 text-sm text-muted-foreground">Patient mood by day and time slot</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Day</th>
                  {["8am", "10am", "12pm", "2pm", "4pm"].map((t) => (
                    <th key={t} className="pb-3 text-center text-sm font-medium text-muted-foreground">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row) => (
                  <tr key={row.day}>
                    <td className="py-1.5 text-sm font-medium text-foreground">{row.day}</td>
                    {(["8am", "10am", "12pm", "2pm", "4pm"] as const).map((t) => (
                      <td key={t} className="p-1.5">
                        <div className={`flex h-12 items-center justify-center rounded-lg text-sm font-semibold ${getHeatColor(row[t])} ${row[t] === 0 ? "text-muted-foreground/30" : "text-foreground"}`}>
                          {row[t] > 0 ? row[t].toFixed(1) : "—"}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-destructive/40" /> &lt;4.0 Friction</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-accent/40" /> 4.0–4.3 OK</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-secondary/40" /> 4.4–4.6 Good</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-secondary/70" /> 4.7+ Excellent</span>
          </div>
        </motion.div>

        {/* Recent Feedback */}
        <motion.div
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-1 text-lg font-semibold text-foreground">Recent Feedback</h3>
          <p className="mb-6 text-sm text-muted-foreground">Latest Google Reviews & internal feedback</p>
          <div className="space-y-4">
            {recentFeedback.map((fb, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                  {fb.patient.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{fb.patient}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: fb.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${getSentimentColor(fb.sentiment)}`}>
                      {fb.sentiment}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{fb.comment}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{fb.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ClinicPulse;
