"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Fel e-post eller lösenord");
    } else {
      router.push("/");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(180,140,80,0.07) 0%, transparent 60%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        input { background: rgba(255,255,255,0.04); border: 1px solid rgba(180,140,80,0.25); color: #e8e0d0; border-radius: 2px; padding: 12px 16px; width: 100%; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 300; outline: none; transition: border-color 0.2s; }
        input:focus { border-color: rgba(180,140,80,0.6); }
      `}</style>
      <div style={{ width: 360, padding: "48px 40px", border: "1px solid rgba(180,140,80,0.15)", borderRadius: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 300, letterSpacing: 3, color: "#d4a853" }}>HOROLOGIE</div>
          <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 9, letterSpacing: 4, color: "#666", textTransform: "uppercase", marginTop: 4 }}>Watch Valuation System</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: 10, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>E-post</label>
            <input type="email" placeholder="din@mail.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          <div>
            <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: 10, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Lösenord</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          {error && <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#f87171", fontWeight: 300 }}>{error}</div>}
          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            style={{ background: "linear-gradient(135deg, #b48c50, #d4a853, #b48c50)", color: "#0a0a0a", border: "none", padding: "14px", fontFamily: "Montserrat, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer", borderRadius: 1, marginTop: 8, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </div>
      </div>
    </div>
  );
}
