"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export type CreatePublicationState = { error?: string; success?: string };

export async function createPublication(_prev: CreatePublicationState, formData: FormData): Promise<CreatePublicationState> {
  const session = await requireRole("editor", "admin");
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const kind = formData.get("kind");
  const description = String(formData.get("description") ?? "").trim();
  if (title.length < 2 || title.length > 150) return { error: "Le titre doit contenir entre 2 et 150 caractères." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100) return { error: "Utilisez un identifiant URL en lettres minuscules, chiffres et tirets." };
  if (kind !== "BOOK" && kind !== "MAGAZINE") return { error: "Type de publication invalide." };
  if (description.length > 3000) return { error: "Description trop longue." };
  const existing = await prisma.publication.findUnique({ where: { slug }, select: { id: true } });
  if (existing) return { error: "Cet identifiant URL est déjà utilisé." };
  try {
    await prisma.publication.create({
      data: { slug, title, kind, description: description || null, status: "DRAFT", authorId: session.user.id },
    });
  } catch {
    return { error: "Impossible d’enregistrer le brouillon. Réessayez." };
  }
  revalidatePath("/dashboard/editor");
  return { success: "Brouillon enregistré. Il n’est pas publié sur le site." };
}
