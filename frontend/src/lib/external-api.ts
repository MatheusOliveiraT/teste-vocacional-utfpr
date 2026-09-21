import {
  ExternalDashboardStats,
  ExternalTestOptions,
  ExternalTestResultsResponse,
} from "@/types/external-api";

/**
 * Base URL da API real do backend (fora deste projeto Next.js). Configure
 * via variável de ambiente `EXTERNAL_API_BASE_URL` (veja `.env.local.example`).
 * Fica sem o prefixo `NEXT_PUBLIC_` de propósito: essas chamadas acontecem
 * apenas no servidor (Server Components e Route Handlers), nunca no
 * navegador, então a URL do backend não precisa (nem deve) ser exposta ao
 * cliente.
 */
const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.API_INTERNAL_URL || "http://backend:4000" // Chamadas dentro do container Docker
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    // Dados de dashboard/respostas mudam com frequência; nunca cachear.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Falha ao consultar ${path} na API (HTTP ${response.status}).`
    );
  }

  return response.json() as Promise<T>;
}

/** GET /api/test/options — escolas, séries e perfis/cursos disponíveis. */
export function fetchExternalTestOptions(): Promise<ExternalTestOptions> {
  return getJson<ExternalTestOptions>("/api/test/options");
}

/** GET /api/dashboard/stats — métricas agregadas do painel administrativo. */
export function fetchExternalDashboardStats(): Promise<ExternalDashboardStats> {
  return getJson<ExternalDashboardStats>("/api/dashboard/stats");
}

/** GET /api/test/results — lista de respostas (estudantes) já concluídas. */
export function fetchExternalTestResults(): Promise<ExternalTestResultsResponse> {
  return getJson<ExternalTestResultsResponse>("/api/test/results");
}
