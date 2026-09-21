import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getDashboardData } from "@/lib/admin-source";

export const metadata = {
  title: "Painel Administrativo — Teste Vocacional UTFPR",
};

// Dados administrativos mudam a cada mutação (criar/editar/excluir), então
// desativamos o cache estático da rota e buscamos o snapshot mais recente
// a cada acesso.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const initialData = await getDashboardData();

  return <AdminDashboard initialData={initialData} />;
}
