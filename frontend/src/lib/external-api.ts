import {
  ExternalAdminResultInput,
  ExternalDashboardStats,
  ExternalTestOptions,
  ExternalTestResult,
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

async function parseOrThrow<T>(response: Response, path: string): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ?? `Falha ao consultar ${path} na API (HTTP ${response.status}).`
    );
  }
  return response.json() as Promise<T>;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    // Dados de dashboard/respostas mudam com frequência; nunca cachear.
    cache: "no-store",
  });
  return parseOrThrow<T>(response, path);
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return parseOrThrow<T>(response, path);
}

async function deleteRequest(path: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
    cache: "no-store",
  });
  await parseOrThrow<{ ok: true }>(response, path);
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

/**
 * POST /api/test/results — cria (sem `id`) ou edita (com `id`) uma resposta
 * diretamente pelo painel administrativo, sem passar pelos duelos.
 */
export function createOrUpdateExternalTestResult(
  input: ExternalAdminResultInput
): Promise<ExternalTestResult> {
  return postJson<ExternalTestResult>("/api/test/results", input);
}

/** DELETE /api/test/results/:id */
export function deleteExternalTestResult(id: string): Promise<void> {
  return deleteRequest(`/api/test/results/${id}`);
}

/** POST /api/test/results/bulk-delete — exclusão em massa. */
export function bulkDeleteExternalTestResults(ids: string[]): Promise<void> {
  return postJson<{ ok: true }>("/api/test/results/bulk-delete", { ids }).then(
    () => undefined
  );
}
