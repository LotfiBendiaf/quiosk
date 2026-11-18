import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditorialContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("q-container", className)} {...props} />;
}

export function EditorialBadge({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "mist" | "plum" }) {
  return <span className={`q-badge q-badge--${tone}`}>{children}</span>;
}

export function EditorialDivider({ label }: { label?: string }) {
  return <div className="q-divider" role="separator">{label && <span>{label}</span>}</div>;
}

export function SectionHeading({ eyebrow, title, emphasis, action }: { eyebrow: string; title: string; emphasis?: string; action?: { label: string; href: string } }) {
  return (
    <div className="q-section-heading">
      <div><p className="q-eyebrow">{eyebrow}</p><h2 className="q-h2">{title}{emphasis && <> <em>{emphasis}</em></>}</h2></div>
      {action && <Link className="q-text-link" href={action.href}>{action.label}<ArrowRight aria-hidden="true" size={16} /></Link>}
    </div>
  );
}
