"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type Mode = "login" | "signup";

export function AuthExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const result = mode === "login"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ name: name.trim(), email, password });
      if (result.error) {
        setError(result.error.message ?? "Impossible de poursuivre. Vérifiez vos informations.");
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Une erreur de connexion s’est produite. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  function changeMode(next: Mode) {
    setMode(next); setError(""); setPassword(""); setVisible(false);
  }

  return <main className="auth-shell">
    <aside className="auth-story">
      <Image src="/images/Mediterranean Terrace Overlooking Algiers-3.png" alt="Terrasse méditerranéenne ensoleillée" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
      <div className="auth-story__wash" />
      <Link href="/" className="auth-brand auth-brand--light" aria-label="Quiosk, accueil">QUIOSK</Link>
      <div className="auth-story__quote"><p>« Lire, c’est voyager sans jamais quitter la lumière. »</p><span>Quiosk · Un monde à découvrir</span></div>
    </aside>
    <section className="auth-panel">
      <div className="auth-panel__top"><Link href="/" className="auth-back"><ArrowLeft aria-hidden="true" /> Retour à l’accueil</Link><span>LECTURE · CULTURE · CURIOSITÉ</span></div>
      <div className="auth-card">
        <div className="auth-intro"><p className="auth-eyebrow">Votre espace Quiosk</p><h1>{mode === "login" ? "Reprenez votre lecture" : "Votre prochaine lecture"}<br /><em>{mode === "login" ? "là où vous l’avez laissée." : "commence ici."}</em></h1></div>
        <div className="auth-tabs" role="group" aria-label="Connexion ou inscription">
          <button type="button" aria-pressed={mode === "login"} onClick={() => changeMode("login")}>Connexion</button>
          <button type="button" aria-pressed={mode === "signup"} onClick={() => changeMode("signup")}>Inscription</button>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {mode === "signup" && <label>Nom complet<input name="name" type="text" minLength={2} maxLength={120} autoComplete="name" value={name} onChange={e => setName(e.target.value)} required /></label>}
          <label>Adresse e-mail<input name="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
          <label>Mot de passe<span className="auth-password"><input name="password" type={visible ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} value={password} onChange={e => setPassword(e.target.value)} required /><button type="button" aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"} onClick={() => setVisible(!visible)}>{visible ? <EyeOff /> : <Eye />}</button></span></label>
          {error && <p role="alert" className="auth-error">{error}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>{busy ? "Veuillez patienter…" : mode === "login" ? "Se connecter" : "Créer mon compte"} <ArrowRight aria-hidden="true" /></button>
        </form>
        <p className="auth-switch">{mode === "login" ? "Nouveau sur Quiosk ?" : "Déjà membre ?"} <button type="button" onClick={() => changeMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Créer un compte" : "Se connecter"}</button></p>
        <p className="auth-security"><LockKeyhole aria-hidden="true" /> Votre session est gérée de manière sécurisée par Better Auth.</p>
      </div>
    </section>
  </main>;
}
