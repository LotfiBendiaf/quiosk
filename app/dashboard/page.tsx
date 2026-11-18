import { redirect } from "next/navigation";
import { requireSession } from "@/lib/authz";

export default async function DashboardEntry() {
  const session = await requireSession();
  if (session.user.role === "admin") redirect("/dashboard/admin");
  if (session.user.role === "editor") redirect("/dashboard/editor");
  redirect("/dashboard/client");
}
