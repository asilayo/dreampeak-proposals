import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./supabaseClient";
import { installStorage } from "./storage";
import Auth from "./Auth.jsx";
import App from "./App.jsx";

// Route all of the app's window.storage calls to the shared Supabase table.
installStorage();

function Root() {
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div
        style={{
          minHeight: "100%",
          display: "grid",
          placeItems: "center",
          background: "#f4ebdd",
          color: "#8a7766",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        Loading…
      </div>
    );
  }

  if (!session) return <Auth />;

  return (
    <>
      <App />
      <button
        onClick={() => supabase.auth.signOut()}
        title={`Signed in as ${session.user?.email || ""} — click to sign out`}
        style={{
          position: "fixed",
          left: 14,
          bottom: 14,
          zIndex: 70,
          border: "1px solid rgba(255,255,255,.18)",
          background: "#2e2014",
          color: "#f4ebdd",
          borderRadius: 999,
          padding: "8px 14px",
          fontSize: 12.5,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "Inter, system-ui, sans-serif",
          boxShadow: "0 8px 22px rgba(0,0,0,.28)",
        }}
      >
        Sign out
      </button>
    </>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
