import {
  AdminDashboardData,
  AdminStudent,
  AdminStudentInput,
} from "@/types";

/**
 * Camada fina de acesso à API do painel administrativo, usada apenas no
 * cliente (dentro de componentes "use client"). Centralizar os `fetch`
 * aqui facilita trocar a URL base para uma API real no futuro sem tocar
 * nos componentes.
 */

async function parseOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ?? `Falha na requisição (HTTP ${response.status}).`
    );
  }
  return response.json() as Promise<T>;
}

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  const response = await fetch("/api/admin", { cache: "no-store" });
  return parseOrThrow<AdminDashboardData>(response);
}

export async function saveStudent(
  input: AdminStudentInput
): Promise<AdminStudent> {
  const response = await fetch("/api/admin/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseOrThrow<AdminStudent>(response);
}

export async function deleteStudentRequest(id: string): Promise<void> {
  const response = await fetch(`/api/admin/students/${id}`, {
    method: "DELETE",
  });
  await parseOrThrow<{ ok: true }>(response);
}

export async function deleteStudentsRequest(ids: string[]): Promise<void> {
  const response = await fetch("/api/admin/students/bulk-delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  await parseOrThrow<{ ok: true }>(response);
}
