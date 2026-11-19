import type { InputHTMLAttributes, ReactNode } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="q-field">
      <label>
        <span className="q-field__label">
          <span>{label}</span>
          {hint && <small>{hint}</small>}
        </span>
        {children}
      </label>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="q-search-input">
      <Search aria-hidden="true" />
      <Input
        type="search"
        aria-label="Rechercher dans Quiosk"
        placeholder="Un titre, un thème, un éditeur…"
        {...props}
      />
      <kbd>⌘ K</kbd>
    </div>
  );
}

export function NewsletterInput() {
  return (
    <form className="q-newsletter-input">
      <label htmlFor="showcase-newsletter">Votre adresse e-mail</label>
      <div>
        <Input id="showcase-newsletter" type="email" placeholder="vous@exemple.fr" required />
        <Button variant="icon" aria-label="S’inscrire à la newsletter">
          <ArrowRight />
        </Button>
      </div>
      <small>Deux lettres choisies par mois. Désinscription en un clic.</small>
    </form>
  );
}
