"use client";

import { useActionState } from "react";
import { createPublication, type CreatePublicationState } from "@/app/dashboard/editor/actions";

const initial: CreatePublicationState = {};

export function PublicationForm() {
  const [state, action, pending] = useActionState(createPublication, initial);
  return <section className="q-dashboard__form">
    <h2>Ajouter une publication</h2>
    <p>Création d’un brouillon uniquement — aucun contenu n’est publié automatiquement.</p>
    <form action={action}>
      <label>Titre<input name="title" required minLength={2} maxLength={150} placeholder="Le titre de la publication" /></label>
      <label>Identifiant URL<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} placeholder="mon-magazine" /></label>
      <label>Type<select name="kind" defaultValue="MAGAZINE"><option value="MAGAZINE">Magazine</option><option value="BOOK">Livre</option></select></label>
      <label>Description<textarea name="description" maxLength={3000} rows={4} placeholder="Présentation éditoriale (facultatif)" /></label>
      {state.error && <p role="alert" className="q-dashboard__error">{state.error}</p>}
      {state.success && <p role="status" className="q-dashboard__success">{state.success}</p>}
      <button type="submit" disabled={pending}>{pending ? "Enregistrement…" : "Créer le brouillon"}</button>
    </form>
  </section>;
}
