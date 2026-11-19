"use client";

import { FormEvent, type ReactNode, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroMotion({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="home-hero__stage"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

export function HeroReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function CoverReveal({
  children,
  className,
  index,
}: {
  children: ReactNode;
  className: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 38, rotate: 0 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function NewsletterForm() {
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("L’inscription sera disponible prochainement. Votre adresse n’a pas été envoyée.");
  }
  return (
    <form className="home-newsletter__form" onSubmit={submit} noValidate={false}>
      <label htmlFor="home-newsletter">Votre adresse e-mail</label>
      <div>
        <input
          id="home-newsletter"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Votre adresse e-mail"
          required
        />
        <Button type="submit">
          S’inscrire <ArrowRight />
        </Button>
      </div>
      <p className="home-newsletter__note" aria-live="polite">
        {notice || "Deux lettres choisies par mois. Aucun envoi sans votre accord."}
      </p>
    </form>
  );
}
