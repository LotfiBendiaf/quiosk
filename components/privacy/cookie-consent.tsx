"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Cookie, Settings2, X } from "lucide-react";

const CONSENT_KEY = "quiosk-cookie-consent";
const CONSENT_VERSION = 1;
const SIX_MONTHS = 60 * 60 * 24 * 180;

export type CookieConsent = {
  version: number;
  necessary: true;
  analytics: boolean;
  personalization: boolean;
  marketing: boolean;
  updatedAt: string;
};

type OptionalConsent = Pick<CookieConsent, "analytics" | "personalization" | "marketing">;

const essentialOnly: OptionalConsent = {
  analytics: false,
  personalization: false,
  marketing: false,
};

function readConsent(): CookieConsent | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as CookieConsent;
    return parsed.version === CONSENT_VERSION && parsed.necessary === true ? parsed : null;
  } catch {
    return null;
  }
}

function persistConsent(preferences: OptionalConsent) {
  const consent: CookieConsent = {
    version: CONSENT_VERSION,
    necessary: true,
    ...preferences,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // The cookie remains the fallback when storage is unavailable.
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify(consent))}; Path=/; Max-Age=${SIX_MONTHS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<CookieConsent>("quiosk:cookie-consent", { detail: consent }));

  // Update Google Consent Mode if a Google integration is added later.
  const win = window as Window & { dataLayer?: unknown[][] };
  win.dataLayer?.push([
    "consent",
    "update",
    {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      personalization_storage: consent.personalization ? "granted" : "denied",
    },
  ]);

  return consent;
}

export function CookieConsentManager() {
  const [isReady, setIsReady] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<OptionalConsent>(essentialOnly);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = readConsent();
    queueMicrotask(() => {
      if (consent) {
        setPreferences({
          analytics: consent.analytics,
          personalization: consent.personalization,
          marketing: consent.marketing,
        });
        setHasChoice(true);
      }
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!showPreferences) return;
    dialogRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && hasChoice) setShowPreferences(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [hasChoice, showPreferences]);

  function save(nextPreferences: OptionalConsent) {
    persistConsent(nextPreferences);
    setPreferences(nextPreferences);
    setHasChoice(true);
    setShowPreferences(false);
  }

  if (!isReady) return null;

  return (
    <>
      {!hasChoice && !showPreferences ? (
        <section className="cookie-banner" aria-label="Choix des cookies" aria-live="polite">
          <div className="cookie-banner__icon" aria-hidden="true">
            <Cookie />
          </div>
          <div className="cookie-banner__copy">
            <p className="cookie-banner__eyebrow">Votre vie privée, votre choix</p>
            <h2>Une lecture sans miettes indiscrètes.</h2>
            <p>
              Nous utilisons des cookies nécessaires au fonctionnement de Quiosk. Avec votre accord,
              nous pouvons aussi mesurer l’audience et personnaliser votre expérience.
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" className="cookie-button cookie-button--primary" onClick={() => save({ analytics: true, personalization: true, marketing: true })}>
              Tout accepter
            </button>
            <button type="button" className="cookie-button" onClick={() => save(essentialOnly)}>
              Tout refuser
            </button>
            <button type="button" className="cookie-button cookie-button--text" onClick={() => setShowPreferences(true)}>
              <Settings2 aria-hidden="true" /> Personnaliser
            </button>
          </div>
        </section>
      ) : null}

      {showPreferences ? (
        <div className="cookie-modal" role="presentation">
          <button
            className="cookie-modal__backdrop"
            type="button"
            aria-label="Fermer les préférences"
            onClick={() => hasChoice && setShowPreferences(false)}
          />
          <div
            ref={dialogRef}
            className="cookie-preferences"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            tabIndex={-1}
          >
            <div className="cookie-preferences__header">
              <div>
                <p className="cookie-banner__eyebrow">Centre de préférences</p>
                <h2 id="cookie-preferences-title">Choisissez ce que vous partagez.</h2>
              </div>
              {hasChoice ? (
                <button type="button" className="cookie-close" aria-label="Fermer" onClick={() => setShowPreferences(false)}>
                  <X aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <p className="cookie-preferences__intro">
              Les cookies optionnels restent désactivés tant que vous ne les acceptez pas. Vous pouvez
              modifier ce choix à tout moment.
            </p>
            <div className="cookie-categories">
              <ConsentRow title="Nécessaires" description="Panier, sécurité et mémorisation de vos choix de confidentialité." checked locked onChange={() => undefined} />
              <ConsentRow title="Mesure d’audience" description="Nous aide à comprendre quelles pages sont utiles, avec des statistiques agrégées." checked={preferences.analytics} onChange={(analytics) => setPreferences((current) => ({ ...current, analytics }))} />
              <ConsentRow title="Personnalisation" description="Permet d’adapter les recommandations et de mémoriser vos préférences de lecture." checked={preferences.personalization} onChange={(personalization) => setPreferences((current) => ({ ...current, personalization }))} />
              <ConsentRow title="Marketing" description="Permet de mesurer nos campagnes et d’éviter les communications répétitives." checked={preferences.marketing} onChange={(marketing) => setPreferences((current) => ({ ...current, marketing }))} />
            </div>
            <div className="cookie-preferences__actions">
              <button type="button" className="cookie-button" onClick={() => save(essentialOnly)}>Tout refuser</button>
              <button type="button" className="cookie-button cookie-button--primary" onClick={() => save(preferences)}>
                <Check aria-hidden="true" /> Enregistrer mes choix
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {hasChoice && !showPreferences ? (
        <button type="button" className="cookie-settings" onClick={() => setShowPreferences(true)} aria-label="Gérer mes préférences de cookies">
          <Cookie aria-hidden="true" />
          <span>Cookies</span>
        </button>
      ) : null}
    </>
  );
}

function ConsentRow({ title, description, checked, locked = false, onChange }: { title: string; description: string; checked: boolean; locked?: boolean; onChange: (checked: boolean) => void }) {
  return (
    <div className="cookie-category">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <label className="cookie-switch">
        <span className="sr-only">{locked ? `${title} — toujours actifs` : `Autoriser : ${title}`}</span>
        <input type="checkbox" checked={checked} disabled={locked} onChange={(event) => onChange(event.target.checked)} />
        <span className="cookie-switch__track" aria-hidden="true"><span /></span>
      </label>
    </div>
  );
}
