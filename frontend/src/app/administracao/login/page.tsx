"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/dashboard/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Garante envio e recebimento de cookies
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao efetuar login.");
      }

      router.push("/administracao");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-md bg-surface-card p-8 rounded-2xl shadow-lg border border-border-subtle flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary-container flex items-center justify-center">
            <Icon name="lock" className="text-2xl" />
          </div>
          <h1 className="font-headline-md text-headline-md text-text-high-contrast">
            Acesso Administrativo
          </h1>
          <p className="font-body-sm text-text-muted">
            Painel do Teste Vocacional UTFPR-CM
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-status-error/10 border border-status-error/30 text-status-error font-body-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-text-high-contrast">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@utfpr.edu.br"
              className="px-4 py-2.5 rounded-lg bg-surface-track border border-border-subtle text-text-high-contrast focus:outline-none focus:border-primary-container"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-text-high-contrast">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-2.5 rounded-lg bg-surface-track border border-border-subtle text-text-high-contrast focus:outline-none focus:border-primary-container"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-xl bg-primary-container text-surface-base font-label-lg font-bold hover:bg-brand-yellow-hover transition-all disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar no Painel"}
          </button>
        </form>
      </div>
    </div>
  );
}