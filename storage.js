import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
    if (error) setErr(error.message);
    setBusy(false);
  };

  const F = "'Space Grotesk', system-ui, sans-serif";
  return (
    <div
      style={{
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        padding: 20,
        background: "#f4ebdd",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#3a2c20",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fffdf9",
          border: "1px solid #e7dac6",
          borderRadius: 16,
          padding: "30px 28px",
          boxShadow: "0 24px 60px -28px rgba(46,32,20,.4)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            style={{
              fontFamily: F,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: ".02em",
              color: "#2e2014",
            }}
          >
            DREAM PEAK SAFARIS
          </div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#c0531f",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Itinerary &amp; pricing console
          </div>
        </div>

        <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", color: "#8a7766" }}>
          Work email
        </label>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inp}
          placeholder="you@dreampeaksafaris.com"
        />

        <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", color: "#8a7766", marginTop: 14, display: "block" }}>
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          style={inp}
          placeholder="••••••••"
        />

        {err && (
          <div style={{ color: "#b0492b", fontSize: 13, marginTop: 12 }}>{err}</div>
        )}

        <button
          type="submit"
          disabled={busy}
          style={{
            marginTop: 18,
            width: "100%",
            border: 0,
            borderRadius: 11,
            padding: "12px 16px",
            fontWeight: 600,
            fontSize: 15,
            cursor: busy ? "not-allowed" : "pointer",
            background: "#c0531f",
            color: "#fff",
            fontFamily: "Inter, system-ui, sans-serif",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <p style={{ fontSize: 12, color: "#8a7766", marginTop: 16, lineHeight: 1.5, textAlign: "center" }}>
          Team access only. Ask an admin to create your account in Supabase if you
          don&apos;t have one.
        </p>
      </form>
    </div>
  );
}

const inp = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: 6,
  background: "#fff",
  border: "1px solid #d9c8ae",
  borderRadius: 10,
  padding: "11px 12px",
  fontSize: 14,
  fontFamily: "Inter, system-ui, sans-serif",
  color: "#3a2c20",
};
