import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Live activity pool ───────────────────────────────────────────────────────
const activityPool = [
  { icon: "✓", text: "Lead captured — Shopify store", color: "#22c55e" },
  { icon: "↗", text: "Follow-up email sent — Ahmad K.", color: "#3b82f6" },
  { icon: "✓", text: "Support ticket resolved — auto", color: "#22c55e" },
  { icon: "↗", text: "CRM updated — new lead qualified", color: "#3b82f6" },
  { icon: "✓", text: "Invoice generated — Order #4821", color: "#22c55e" },
  { icon: "↗", text: "AI reply sent — WhatsApp inquiry", color: "#3b82f6" },
  { icon: "✓", text: "New order processed — WooCommerce", color: "#22c55e" },
  { icon: "↗", text: "Lead scored — high priority", color: "#a855f7" },
  { icon: "✓", text: "Report generated — weekly summary", color: "#22c55e" },
  { icon: "↗", text: "Appointment booked — Sara M.", color: "#3b82f6" },
  { icon: "✓", text: "Duplicate removed — CRM cleaned", color: "#22c55e" },
  { icon: "↗", text: "Email sequence triggered — new lead", color: "#3b82f6" },
];

// ─── Typing number hook ───────────────────────────────────────────────────────
function useFlickerNumber(value: number, decimals = 0) {
  const [display, setDisplay] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Animate through random values toward target
    let steps = 6;
    const animate = () => {
      if (steps <= 0) { setDisplay(value); return; }
      const noise = (Math.random() - 0.5) * value * 0.15;
      setDisplay(parseFloat((value + noise).toFixed(decimals)));
      steps--;
      timeoutRef.current = setTimeout(animate, 60);
    };
    animate();
    return () => clearTimeout(timeoutRef.current);
  }, [value, decimals]);

  return display;
}

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({
  label, value, suffix, change, color, decimals = 0
}: {
  label: string; value: number; suffix: string;
  change: string; color: string; decimals?: number;
}) {
  const displayed = useFlickerNumber(value, decimals);

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14, padding: "14px 16px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: 2, background: color,
        opacity: 0.8, borderRadius: "14px 14px 0 0",
      }} />
      <div style={{
        fontSize: "0.68rem", color: "rgba(255,255,255,0.38)",
        letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 6,
      }}>{label}</div>
      <div style={{
        fontSize: "1.65rem", fontWeight: 800, color: "#fff",
        lineHeight: 1, marginBottom: 7, fontVariantNumeric: "tabular-nums",
        minWidth: 80,
      }}>
        {decimals > 0
          ? displayed.toFixed(decimals)
          : Math.round(displayed).toLocaleString()
        }{suffix}
      </div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        fontSize: "0.7rem", fontWeight: 600, color,
        background: color + "1a", padding: "2px 9px", borderRadius: 999,
      }}>
        {change} this week
      </div>
    </div>
  );
}

// ─── Activity row ─────────────────────────────────────────────────────────────
interface Activity {
  id: number;
  icon: string;
  text: string;
  color: string;
  secs: number;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function NetworkCanvas() {
  // Metric values that change every ~2s
  const [metrics, setMetrics] = useState({
    hours:    847,
    leads:    2340,
    tasks:    5892,
    response: 1.2,
  });

  // Activity feed
  const [activities, setActivities] = useState<Activity[]>(() =>
    activityPool.slice(0, 5).map((a, i) => ({ ...a, id: i, secs: (i + 1) * 7 }))
  );
  const idRef = useRef(100);

  // Update metrics every 1.8s
  useEffect(() => {
    const iv = setInterval(() => {
      setMetrics({
        hours:    Math.round(800 + Math.random() * 120),
        leads:    Math.round(2200 + Math.random() * 300),
        tasks:    Math.round(5600 + Math.random() * 600),
        response: parseFloat((0.8 + Math.random() * 0.8).toFixed(1)),
      });
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  // Tick activity timestamps every second
  useEffect(() => {
    const iv = setInterval(() => {
      setActivities(prev => prev.map(a => ({ ...a, secs: a.secs + 1 })));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // Add new activity every 2.5s, remove oldest if > 5
  useEffect(() => {
    const iv = setInterval(() => {
      const pick = activityPool[Math.floor(Math.random() * activityPool.length)];
      const newItem: Activity = { ...pick, id: idRef.current++, secs: 1 };
      setActivities(prev => [newItem, ...prev].slice(0, 5));
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const fmtSecs = (s: number) =>
    s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}m ago`;

  return (
    <div style={{
      width: "100%", height: "100%", minHeight: 500,
      display: "flex", flexDirection: "column", gap: 10,
      fontFamily: "'Satoshi','Inter',sans-serif",
    }}>

      {/* ── Metrics grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <MetricCard
          label="Hours Saved"    value={metrics.hours}
          suffix="hrs"           change="+12%"
          color="#22c55e"
        />
        <MetricCard
          label="Leads Captured" value={metrics.leads}
          suffix=""              change="+28%"
          color="#3b82f6"
        />
        <MetricCard
          label="Tasks Automated" value={metrics.tasks}
          suffix=""               change="+41%"
          color="#a855f7"
        />
        <MetricCard
          label="Response Time"  value={metrics.response}
          suffix="sec"           change="-94%"
          color="#f59e0b"        decimals={1}
        />
      </div>

      {/* ── Live activity feed ── */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, padding: "13px 15px", flex: 1, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 10,
        }}>
          <span style={{
            fontSize: "0.68rem", color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase", letterSpacing: "0.09em",
          }}>Live Activity</span>
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: "0.68rem", color: "#22c55e",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 6px #22c55e",
              display: "inline-block",
            }} />
            LIVE
          </span>
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <AnimatePresence initial={false}>
            {activities.map((a) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "6px 10px", borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: a.color + "22",
                  border: `1px solid ${a.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.6rem", color: a.color, fontWeight: 700, flexShrink: 0,
                }}>{a.icon}</span>
                <span style={{
                  fontSize: "0.76rem", color: "rgba(255,255,255,0.6)",
                  flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{a.text}</span>
                <span style={{
                  fontSize: "0.65rem", color: "rgba(255,255,255,0.22)", flexShrink: 0,
                }}>{fmtSecs(a.secs)}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10, padding: "9px 15px",
      }}>
        <span style={{
          fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.07em",
        }}>WESHIPZ AI ENGINE</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {["n8n", "OpenAI", "Make"].map((t) => (
            <span key={t} style={{
              fontSize: "0.66rem", color: "rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#22c55e", display: "inline-block",
              }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
