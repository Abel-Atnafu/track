import { useState, useEffect } from "react";

const phases = [
  {
    id: 1,
    title: "Foundation",
    subtitle: "Project setup, design system, navigation, onboarding",
    status: "active",
    color: "#FF6B35",
    tasks: [
      "Initialize Expo + TypeScript project",
      "Install & configure NativeWind v4, Expo Router, Zustand, AsyncStorage",
      "Set up strict tsconfig.json",
      "Build folder structure: /app, /components, /store, /constants, /hooks, /types, /assets",
      "Create theme.ts (colors, typography, spacing, border radius)",
      "Build bottom tab navigation (Home, Workout, Progress, Profile)",
      "Build custom bottom tab bar component",
      "Build 4-screen onboarding flow (Goal, Fitness Level, Equipment, Quick Stats)",
      "Set up userStore and workoutStore in Zustand",
      "Build UI primitives: Button, Card, Badge, ProgressBar, Typography",
    ],
    edits: [
      "Replace any emoji icons in onboarding cards with real images",
      "Verify theme.ts accent color is bold and unique — not generic blue/green",
      "Test Reanimated with a simple animation to confirm it works",
      "Create asset folders: /assets/images/exercises/, /assets/images/onboarding/, /assets/images/ui/",
      "Review custom bottom tab bar — does it feel premium or stock?",
      "Test onboarding flow start to finish on a real device",
      "Confirm Zustand stores are saving and reading correctly",
      "Check TypeScript — zero `any` types allowed",
    ],
    security: [
      "App collects: goal, fitness level, equipment, age, weight, height",
      "All data stored in AsyncStorage (local device only) — no network calls",
      "AsyncStorage is unencrypted — acceptable for non-sensitive data in this phase",
      "No third-party SDKs collecting data in this phase",
      "Privacy note: no data transmitted to any server",
    ],
  },
  {
    id: 2,
    title: "Workout Core",
    subtitle: "Exercise library with real images, workout builder, active workout screen",
    status: "locked",
    color: "#00D4AA",
    tasks: [
      "Build Exercise model/type (name, muscle groups, equipment, difficulty, image, instructions)",
      "Create exercise database (50+ exercises — bodyweight + gym)",
      "Source and add real exercise images to /assets/images/exercises/",
      "Build Exercise Library screen (searchable, filterable by muscle group + equipment)",
      "Build Exercise Detail screen (image, instructions, muscles worked illustration)",
      "Build Workout Builder screen (add exercises, set reps/sets/weight)",
      "Create 3 pre-built programs (Beginner Bodyweight, Intermediate Gym, Advanced Strength)",
      "Build Active Workout screen (exercise display, set logger, rest timer, progress indicator)",
      "Build Workout Complete screen (summary, stats, celebration animation)",
      "Save completed workouts to AsyncStorage via workoutStore",
    ],
    edits: [
      "Every exercise must have a real photo — no placeholders in production",
      "Exercise images consistent in style (same aspect ratio, similar photography)",
      "Filter/search must work correctly across all exercises",
      "Active workout screen — test full workout start to finish",
      "Rest timer must vibrate + play sound when done",
      "Workout completion must save correctly and be retrievable",
      "Review all exercise instructions for accuracy",
      "Confirm pre-built programs load and run correctly",
      "Check UI on multiple screen sizes",
    ],
    security: [
      "New data: workout history (exercises, sets, reps, weight, duration, timestamps)",
      "All data still local — AsyncStorage / workoutStore",
      "Exercise images must be properly licensed — document every source",
      "Workout data is personal health data — treat as sensitive even while local",
      "Privacy note: workout activity data not shared with any third party",
    ],
  },
  {
    id: 3,
    title: "Progress Tracking",
    subtitle: "History log, personal records, charts, body measurements, progress photos",
    status: "locked",
    color: "#7C3AED",
    tasks: [
      "Build Workout History screen (timeline view of past workouts)",
      "Build Personal Records screen (best set per exercise, with date)",
      "Build Progress Charts (weekly volume, workout frequency, bodyweight trend)",
      "Build Body Measurements screen (weight, chest, waist, arms, legs — over time)",
      "Build Progress Photos feature (before/after, stored locally)",
      "Animate chart rendering (smooth draw-on effect)",
      "Add PR celebration moment (animation when new record is set)",
      "Build weekly summary card (workouts done, volume, streak)",
    ],
    edits: [
      "Charts must render correctly with sparse data (1 workout, 2 workouts, etc.)",
      "PR detection must be accurate — test edge cases",
      "Progress photos stored securely (not in public gallery)",
      "Body measurement inputs validated (no negative numbers, realistic ranges)",
      "Weekly summary updates correctly after each workout",
      "Streak counter resets correctly if a day is missed",
      "All charts legible in both light and dark mode",
      "Test with 30+ workouts worth of data to check performance",
    ],
    security: [
      "New data: body measurements, progress photos (sensitive personal images)",
      "Progress photos must use Expo FileSystem — private app directory only",
      "NEVER write progress photos to MediaLibrary without explicit user permission",
      "Recommend adding biometric app lock before this phase ships",
      "Store photos in: FileSystem.documentDirectory + 'progress_photos/'",
      "Privacy note: health and body data never transmitted to any server in this phase",
    ],
  },
  {
    id: 4,
    title: "Visual Identity & UI Overhaul",
    subtitle: "Make IronPath look unlike every other fitness app",
    status: "locked",
    color: "#F59E0B",
    tasks: [
      "Audit every screen — identify anything that looks generic",
      "Build image-driven Exercise cards (full bleed photography, text overlay)",
      "Replace all emoji/icon placeholders with real visual assets",
      "Design and implement bold hero sections on Home screen",
      "Build custom animated components (not stock RN components)",
      "Implement haptic feedback on key interactions",
      "Add micro-interactions (button press states, card reveals, screen transitions)",
      "Refine color system — vivid accents, not washed out",
      "Custom workout completion screen (cinematic feel)",
      "Build shareable workout summary card (image export)",
      "Implement smooth screen transition animations",
      "Review and refine typography across every screen",
    ],
    edits: [
      "Show the app to someone who doesn't know fitness apps — what's their reaction?",
      "Compare side by side with Nike Training Club — does IronPath feel different?",
      "All animations must be smooth — 60fps, no jank",
      "Haptics working on physical device",
      "All images have loading states (skeleton/blur)",
      "App feels fast — no slow transitions",
      "Typography is consistent across every screen",
      "Dark mode looks premium, not just dark background",
      "Every screen has a clear visual hierarchy",
    ],
    security: [
      "Shareable workout cards — user controls what data appears on shared image",
      "Never expose sensitive metrics (body weight, measurements) on shared cards without opt-in",
      "All fonts must have commercial/app distribution license",
      "All photography assets licensed for commercial use in a mobile app",
      "Privacy note: shared images contain only workout performance data by default",
    ],
  },
  {
    id: 5,
    title: "Intelligence Layer",
    subtitle: "AI workout suggestions, plateau detection, weekly summaries",
    status: "locked",
    color: "#06B6D4",
    tasks: [
      "Design AI suggestion logic (based on workout history, frequency, muscle balance)",
      "Build 'What should I do today?' feature",
      "Implement plateau detection (no PR in X weeks on key exercises)",
      "Build rest day recommendation logic",
      "Build weekly performance summary (visual, data-driven)",
      "Add muscle group balance analysis",
      "Build AI-generated progressive overload suggestions",
      "Decide: on-device logic vs API call (Claude/OpenAI)",
    ],
    edits: [
      "AI suggestions must feel personalized, not generic",
      "Test suggestions with beginner data vs advanced data — different results?",
      "Plateau detection — test with flat progress data over 4 weeks",
      "Weekly summary generates correctly every Monday",
      "If using external AI API — confirm API key is NOT in client-side code",
      "All AI calls have loading states and error handling",
      "Suggestions update after every completed workout",
    ],
    security: [
      "CRITICAL: Never put API keys in React Native client code — extractable from APK",
      "Build backend proxy (Supabase Edge Function or Vercel serverless) for AI calls",
      "Only send anonymized workout patterns to AI — not personal identity data",
      "Add clear disclosure to users: workout data sent to AI provider",
      "Give users option to disable AI features in Settings",
      "Privacy note: workout pattern data sent to AI provider for processing",
    ],
  },
  {
    id: 6,
    title: "Pro Subscription",
    subtitle: "RevenueCat integration, paywall, feature gating, receipt validation",
    status: "locked",
    color: "#EC4899",
    tasks: [
      "Define Free vs Pro feature split clearly",
      "Install and configure RevenueCat SDK",
      "Set up products in Google Play Console (monthly + annual)",
      "Build Paywall screen (premium feel, clear value proposition)",
      "Implement feature gating (Pro features locked behind subscription check)",
      "Build subscription management screen (active plan, cancel, restore)",
      "Implement server-side receipt validation via RevenueCat",
      "Handle edge cases: expired subscription, cancelled mid-period, refund",
      "Add free trial if applicable",
    ],
    edits: [
      "Test full subscription purchase flow on real device",
      "Test restore purchases",
      "Test expired subscription — features correctly locked?",
      "Paywall must not be annoying — test with fresh eyes",
      "Free tier must still feel valuable — not crippled",
      "Receipt validation working server-side",
      "Subscription status syncs correctly on app relaunch",
    ],
    security: [
      "Never handle raw payment data yourself — RevenueCat abstracts this entirely",
      "All purchases go through Google Play billing — you never touch card details",
      "Receipt validation must happen server-side (RevenueCat handles this)",
      "Implement subscription status check on every app launch",
      "Never trust client-side subscription status alone — verify server-side",
      "Privacy note: payments processed by Google Play — we do not store card info",
    ],
  },
  {
    id: 7,
    title: "Backend & Accounts",
    subtitle: "User auth, cloud sync for Pro users, account management",
    status: "locked",
    color: "#10B981",
    tasks: [
      "Set up Supabase project",
      "Implement email + Google sign-in (Supabase Auth)",
      "Build account creation + login screens",
      "Sync Pro user data to Supabase (workouts, measurements, settings)",
      "Implement cross-device sync",
      "Build account settings screen (change email, password, notifications)",
      "Build data export feature (download your data as JSON/CSV)",
      "Build account deletion flow (required by Play Store)",
      "Set up Supabase Row Level Security (RLS) policies",
      "Handle offline mode (queue sync when back online)",
    ],
    edits: [
      "Auth flow — test signup, login, logout, password reset",
      "RLS policies — can user A access user B's data? (must be NO)",
      "Sync — test on two devices with same account",
      "Account deletion — does it delete ALL user data from Supabase?",
      "Offline mode — test with airplane mode",
      "Data export — verify exported data is complete and correct",
      "Token refresh — does auth stay valid after 1 hour? 1 day?",
      "Test with slow network (3G simulation)",
    ],
    security: [
      "CRITICAL PHASE — most sensitive security considerations",
      "Use Supabase Auth — do not roll your own authentication",
      "Enforce email verification on signup",
      "Every table must have RLS enabled — no exceptions",
      "RLS policy: auth.uid() = user_id on ALL user data tables",
      "Never expose service role key in client code — anon key only",
      "Store auth tokens in Expo SecureStore — NOT AsyncStorage",
      "GDPR: user must be able to download all data and delete account",
      "Privacy note: data encrypted in transit (HTTPS/TLS) and at rest",
    ],
  },
  {
    id: 8,
    title: "Polish & Publish",
    subtitle: "Final refinements, Play Store listing, launch",
    status: "locked",
    color: "#F97316",
    tasks: [
      "Final UI pass — every screen reviewed and polished",
      "App icon design (multiple sizes for Play Store)",
      "Splash screen",
      "Play Store screenshots (minimum 4, maximum 8)",
      "Play Store feature graphic (1024x500px banner)",
      "Write Play Store listing copy (title, short description, full description)",
      "Configure EAS Build for production APK/AAB",
      "Set up crash reporting (Sentry)",
      "Set up analytics (Mixpanel or PostHog — privacy-friendly)",
      "Performance audit (bundle size, startup time, memory)",
      "Accessibility audit (font sizes, contrast ratios, touch targets)",
      "Beta test via Google Play Internal Testing",
      "Submit for Play Store review",
    ],
    edits: [
      "App icon looks sharp at all sizes",
      "Screenshots show the best screens — not onboarding",
      "App description has keywords for ASO (App Store Optimization)",
      "No console.log statements in production build",
      "All API keys in environment variables — none hardcoded",
      "Crash reporting working — test by forcing a crash",
      "App size reasonable (under 50MB ideally)",
      "Startup time under 3 seconds on mid-range Android",
      "All touch targets minimum 44x44px",
      "Test on low-end Android device (not just flagship)",
    ],
    security: [
      "No API keys, secrets, or passwords in source code",
      "ProGuard/R8 code obfuscation enabled for release build",
      "All sensitive local data uses encrypted storage (Expo SecureStore)",
      "Supabase RLS tested and verified — final check",
      "RevenueCat receipt validation server-side confirmed",
      "All third-party SDKs documented: RevenueCat, Sentry, Analytics",
      "Privacy Policy finalized — covers all data collection across all phases",
      "Terms & Conditions finalized — covers subscription billing and cancellation",
      "Children's policy stated: app is for 13+ users only",
    ],
  },
];

const STORAGE_KEY = "ironpath_tracker_v1";

export default function IronPathTracker() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      tasks: {},
      edits: {},
      security: {},
    };
  });

  const [activePhase, setActivePhase] = useState(1);
  const [activeTab, setActiveTab] = useState("tasks");
  const [expandedSecurity, setExpandedSecurity] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const toggle = (category, phaseId, index) => {
    const key = `${phaseId}-${index}`;
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const getPhaseProgress = (phaseId) => {
    const phase = phases.find((p) => p.id === phaseId);
    const allItems = [...phase.tasks, ...phase.edits];
    const completed = allItems.filter((_, i) => {
      const isEdit = i >= phase.tasks.length;
      const idx = isEdit ? i - phase.tasks.length : i;
      const cat = isEdit ? "edits" : "tasks";
      return data[cat][`${phaseId}-${idx}`];
    }).length;
    return Math.round((completed / allItems.length) * 100);
  };

  const getTabProgress = (phaseId, tab) => {
    const phase = phases.find((p) => p.id === phaseId);
    const items = phase[tab];
    if (!items) return 0;
    const completed = items.filter((_, i) => data[tab][`${phaseId}-${i}`]).length;
    return { completed, total: items.length };
  };

  const currentPhase = phases.find((p) => p.id === activePhase);
  const overallProgress = Math.round(
    phases.reduce((sum, p) => sum + getPhaseProgress(p.id), 0) / phases.length
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e8e8f0",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .phase-pill:hover { transform: translateY(-1px); }
        .task-item:hover { background: rgba(255,255,255,0.04) !important; }
        .tab-btn:hover { background: rgba(255,255,255,0.06) !important; }
        .check-box:hover { border-color: var(--accent) !important; }
      `}</style>

      <div style={{
        background: "linear-gradient(180deg, #0f0f1a 0%, #0a0a0f 100%)",
        borderBottom: "1px solid #1a1a2e",
        padding: "24px 28px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", letterSpacing: "3px", color: "#FF6B35" }}>
              IRONPATH
            </div>
            <div style={{ fontSize: "11px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginTop: "1px" }}>
              Build Tracker — Veltro Studio
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#FF6B35", lineHeight: 1 }}>
              {overallProgress}%
            </div>
            <div style={{ fontSize: "11px", color: "#555", letterSpacing: "1px", marginTop: "2px" }}>OVERALL</div>
          </div>
        </div>

        <div style={{ height: "3px", background: "#1a1a2e", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${overallProgress}%`,
            background: "linear-gradient(90deg, #FF6B35, #FF8C00)",
            borderRadius: "2px",
            transition: "width 0.4s ease",
          }} />
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "16px", overflowX: "auto", paddingBottom: "2px" }}>
          {phases.map((phase) => {
            const prog = getPhaseProgress(phase.id);
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                className="phase-pill"
                onClick={() => setActivePhase(phase.id)}
                style={{
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: isActive ? `1.5px solid ${phase.color}` : "1.5px solid #1e1e2e",
                  background: isActive ? `${phase.color}18` : "transparent",
                  color: isActive ? phase.color : "#444",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                P{phase.id} · {prog}%
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: currentPhase.color,
                  boxShadow: `0 0 8px ${currentPhase.color}`,
                }} />
                <div style={{ fontSize: "11px", color: currentPhase.color, letterSpacing: "2px", fontWeight: "600", textTransform: "uppercase" }}>
                  Phase {currentPhase.id}
                </div>
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "34px", letterSpacing: "2px", lineHeight: 1, color: "#f0f0fa" }}>
                {currentPhase.title.toUpperCase()}
              </div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "6px", lineHeight: 1.5 }}>
                {currentPhase.subtitle}
              </div>
            </div>

            <div style={{ position: "relative", flexShrink: 0 }}>
              <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                <circle
                  cx="32" cy="32" r="26" fill="none"
                  stroke={currentPhase.color} strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - getPhaseProgress(currentPhase.id) / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "14px", fontWeight: "700", color: currentPhase.color,
              }}>
                {getPhaseProgress(currentPhase.id)}%
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: "#0f0f1a", borderRadius: "10px", padding: "4px" }}>
          {["tasks", "edits", "security"].map((tab) => {
            const isActive = activeTab === tab;
            const prog = tab !== "security" ? getTabProgress(currentPhase.id, tab) : null;
            return (
              <button
                key={tab}
                className="tab-btn"
                onClick={() => { setActiveTab(tab); setExpandedSecurity(false); }}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "7px",
                  border: "none",
                  background: isActive ? currentPhase.color : "transparent",
                  color: isActive ? "#fff" : "#555",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
              >
                {tab === "tasks" ? "🔨" : tab === "edits" ? "✏️" : "🔒"} {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {prog && (
                  <span style={{ marginLeft: "6px", opacity: 0.8, fontSize: "11px" }}>
                    {prog.completed}/{prog.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {(activeTab === "tasks" || activeTab === "edits") && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {currentPhase[activeTab].map((item, i) => {
              const checked = data[activeTab][`${currentPhase.id}-${i}`] || false;
              return (
                <div
                  key={i}
                  className="task-item"
                  onClick={() => toggle(activeTab, currentPhase.id, i)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: checked ? `${currentPhase.color}0a` : "#0f0f1a",
                    border: checked ? `1px solid ${currentPhase.color}30` : "1px solid #1a1a2e",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    className="check-box"
                    style={{
                      "--accent": currentPhase.color,
                      width: "18px",
                      height: "18px",
                      borderRadius: "5px",
                      border: checked ? `2px solid ${currentPhase.color}` : "2px solid #2a2a3e",
                      background: checked ? currentPhase.color : "transparent",
                      flexShrink: 0,
                      marginTop: "1px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{
                    fontSize: "13px",
                    lineHeight: "1.5",
                    color: checked ? "#666" : "#c0c0d0",
                    textDecoration: checked ? "line-through" : "none",
                    transition: "all 0.2s ease",
                  }}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "security" && (
          <div style={{
            background: "#0f0f1a",
            border: "1px solid #1f2a1f",
            borderRadius: "12px",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 18px",
              background: "linear-gradient(135deg, #0d1f0d, #0f1a0f)",
              borderBottom: "1px solid #1a2a1a",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <div style={{ fontSize: "20px" }}>🔒</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#4ade80", letterSpacing: "1px" }}>
                  SECURITY ANALYSIS — PHASE {currentPhase.id}
                </div>
                <div style={{ fontSize: "11px", color: "#2d6a2d", marginTop: "2px" }}>
                  Review before writing Privacy Policy & Terms
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {currentPhase.security.map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "10px 12px",
                  background: item.startsWith("CRITICAL") ? "#1a0f0f" : "#0a140a",
                  border: item.startsWith("CRITICAL") ? "1px solid #3a1a1a" : "1px solid #1a2a1a",
                  borderRadius: "8px",
                }}>
                  <div style={{ fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>
                    {item.startsWith("CRITICAL") ? "⚠️" : item.startsWith("Privacy note") ? "📋" : "•"}
                  </div>
                  <span style={{
                    fontSize: "13px",
                    lineHeight: "1.5",
                    color: item.startsWith("CRITICAL") ? "#f87171" : item.startsWith("Privacy note") ? "#86efac" : "#6b8f6b",
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", gap: "12px" }}>
          <button
            onClick={() => setActivePhase(Math.max(1, activePhase - 1))}
            disabled={activePhase === 1}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #1a1a2e",
              background: "transparent",
              color: activePhase === 1 ? "#2a2a3e" : "#666",
              fontSize: "13px",
              fontWeight: "600",
              cursor: activePhase === 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ← Phase {activePhase - 1}
          </button>

          <div style={{ fontSize: "12px", color: "#333", display: "flex", alignItems: "center" }}>
            {activePhase} / {phases.length}
          </div>

          <button
            onClick={() => setActivePhase(Math.min(phases.length, activePhase + 1))}
            disabled={activePhase === phases.length}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: `1px solid ${activePhase === phases.length ? "#1a1a2e" : currentPhase.color + "50"}`,
              background: activePhase === phases.length ? "transparent" : `${currentPhase.color}15`,
              color: activePhase === phases.length ? "#2a2a3e" : currentPhase.color,
              fontSize: "13px",
              fontWeight: "600",
              cursor: activePhase === phases.length ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Phase {activePhase + 1} →
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #111" }}>
          <div style={{ fontSize: "11px", color: "#2a2a3a", letterSpacing: "1.5px" }}>
            IRONPATH · VELTRO STUDIO · PROGRESS SAVED LOCALLY
          </div>
        </div>
      </div>
    </div>
  );
}
