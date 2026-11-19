import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingState() {
  return (
    <div
      className="q-state q-state--loading"
      aria-busy="true"
      aria-label="Chargement des magazines"
    >
      <span />
      <div>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="q-state">
      <BookOpen aria-hidden="true" />
      <p className="q-eyebrow">Votre bibliothèque</p>
      <h3 className="q-h3">Votre prochaine lecture vous attend.</h3>
      <p className="q-body-sm">Explorez notre sélection et ajoutez votre premier numéro.</p>
      <Button>Découvrir les magazines</Button>
    </div>
  );
}
