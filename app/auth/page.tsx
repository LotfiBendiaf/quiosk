import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthExperience } from "@/components/auth/auth-experience";
import "./auth.css";

export const metadata: Metadata = {
  title: "Connexion & inscription",
  description: "Connectez-vous à Quiosk ou créez votre compte pour composer votre bibliothèque.",
};

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-shell auth-shell--loading" aria-label="Chargement de votre espace" />
      }
    >
      <AuthExperience />
    </Suspense>
  );
}
