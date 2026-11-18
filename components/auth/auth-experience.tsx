"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Eye, EyeOff, Library, LockKeyhole } from "lucide-react";

type AuthMode = "login" | "signup";

const perks = [
  [Library, "Votre bibliothèque, partout", "Retrouvez vos numéros et vos favoris sur tous vos écrans."],
  [BookOpen, "Une lecture sans distraction", "Profitez d’un espace calme, pensé pour les belles histoires."],
] as const;

export function AuthExperience() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const copy = useMemo(() => mode === "login" ? {
    eyebrow: "Heureux de vous revoir",
    title: "Reprenez votre lecture",
    emphasis: "là où vous l’avez laissée.",
    submit: "Se connecter",
    foot: "Nouveau sur Quiosk ?",
    switchLabel: "Créer un compte",
  } : {
    eyebrow: "Bienvenue chez Quiosk",
    title: "Votre prochaine lecture",
    emphasis: "commence ici.",
    submit: "Créer mon compte",
    foot: "Vous avez déjà un compte ?",
    switchLabel: "Se connecter",
  }, [mode]);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setSubmitted(false);
    setPasswordVisible(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return <main className="auth-shell auth-shell--complete">
      <section className="auth-complete" aria-live="polite">
        <Link href="/" className="auth-brand" aria-label="Quiosk, accueil">QUIOSK</Link>
        <span className="auth-complete__icon"><Check aria-hidden="true" /></span>
        <p className="auth-eyebrow">{mode === "login" ? "Connexion prête" : "Inscription prête"}</p>
        <h1>{mode === "login" ? "Bon retour parmi nous." : "Bienvenue dans votre nouvel univers."}</h1>
        <p>L’interface a validé les informations pour <strong>{email}</strong>. La création de session sera activée dès qu’un service d’authentification sera connecté.</p>
        <Link href="/" className="auth-primary-link">Retourner à l’accueil <ArrowRight aria-hidden="true" /></Link>
        <button type="button" onClick={() => setSubmitted(false)}>Modifier mes informations</button>
      </section>
    </main>;
  }

  return <main className="auth-shell">
    <aside className="auth-story" aria-label="L’expérience Quiosk">
      <Image src="/images/Mediterranean Terrace Overlooking Algiers-3.png" alt="Terrasse méditerranéenne baignée de lumière" fill loading="eager" sizes="(max-width: 900px) 100vw, 48vw" />
      <div className="auth-story__wash" />
      <Link href="/" className="auth-brand auth-brand--light" aria-label="Quiosk, accueil">QUIOSK</Link>
      <div className="auth-story__quote">
        <p>« Lire, c’est voyager sans jamais quitter la lumière. »</p>
        <span>La bibliothèque Quiosk</span>
      </div>
      <div className="auth-story__folio"><span>01</span><i /><span>24</span></div>
    </aside>

    <section className="auth-panel">
      <div className="auth-panel__top">
        <Link href="/" className="auth-back"><ArrowLeft aria-hidden="true" /> Retour à l’accueil</Link>
        <span>Lecture · Culture · Curiosité</span>
      </div>

      <div className="auth-card">
        <div className="auth-intro">
          <p className="auth-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}<br /><em>{copy.emphasis}</em></h1>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Choisir le formulaire">
          <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => switchMode("login")}>Connexion</button>
          <button type="button" role="tab" aria-selected={mode === "signup"} onClick={() => switchMode("signup")}>Inscription</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && <div className="auth-field-row">
            <label>Prénom<input name="firstName" type="text" autoComplete="given-name" placeholder="Nora" minLength={2} required /></label>
            <label>Nom<input name="lastName" type="text" autoComplete="family-name" placeholder="Bensaïd" minLength={2} required /></label>
          </div>}
          <label>Adresse e-mail<input name="email" type="email" autoComplete="email" inputMode="email" placeholder="vous@exemple.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Mot de passe
            <span className="auth-password">
              <input name="password" type={passwordVisible ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder={mode === "login" ? "Votre mot de passe" : "8 caractères minimum"} minLength={8} required />
              <button type="button" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}>{passwordVisible ? <EyeOff /> : <Eye />}</button>
            </span>
          </label>
          {mode === "signup" && <label className="auth-consent"><input type="checkbox" required /><span>J’accepte les <a href="#conditions">conditions d’utilisation</a> et la <a href="#confidentialite">politique de confidentialité</a>.</span></label>}
          {mode === "login" && <div className="auth-form__options"><label className="auth-remember"><input type="checkbox" /><span>Se souvenir de moi</span></label><a href="#mot-de-passe-oublie">Mot de passe oublié ?</a></div>}
          <button className="auth-submit" type="submit">{copy.submit}<ArrowRight aria-hidden="true" /></button>
        </form>

        <p className="auth-switch">{copy.foot} <button type="button" onClick={() => switchMode(mode === "login" ? "signup" : "login")}>{copy.switchLabel}</button></p>
        <p className="auth-security"><LockKeyhole aria-hidden="true" /> Vos données sont chiffrées et restent confidentielles.</p>
      </div>

      <div className="auth-perks" aria-label="Avantages de votre compte">
        {perks.map(([Icon, title, description]) => <article key={title}><Icon aria-hidden="true" /><div><h2>{title}</h2><p>{description}</p></div></article>)}
      </div>
    </section>
  </main>;
}
