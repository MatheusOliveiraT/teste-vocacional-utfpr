"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface AdminHeaderProps {
  onNewResponse: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function AdminHeader({
  onNewResponse,
  onRefresh,
  isRefreshing,
}: AdminHeaderProps) {
  const [isExportingCsv, setIsExportingCsv] = useState(false);

  // Função para baixar o arquivo CSV diretamente da API Express (com token/cookie de autenticação)
  const handleExportCSV = async () => {
    try {
      setIsExportingCsv(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      
      const response = await fetch(`${apiUrl}/api/dashboard/export/csv`, {
        method: "GET",
        credentials: "include", // Envia o cookie HttpOnly de autenticação (admin_token)
      });

      if (!response.ok) throw new Error("Erro ao baixar o relatório em CSV");

      // Transforma a resposta em um Blob e força o download no navegador
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio_utfpr_vocacional_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Não foi possível exportar o arquivo CSV.");
    } finally {
      setIsExportingCsv(false);
    }
  };

  // Função para gerar o Relatório PDF com os nomes reais convertidos de escolas e séries
  const handlePrintPDF = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      // Busca simultaneamente os resultados e o dicionário de opções (escolas e séries)
      const [resultsRes, optionsRes] = await Promise.all([
        fetch(`${apiUrl}/api/test/results`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(`${apiUrl}/api/test/options`, {
          method: "GET",
          credentials: "include",
        }),
      ]);

      if (!resultsRes.ok) throw new Error("Erro ao buscar resultados para impressão.");

      const resultsData = await resultsRes.json();
      const optionsData = optionsRes.ok ? await optionsRes.json() : { schools: [], schoolLevels: [] };

      const allStudents = resultsData.results || [];

      // Monta os mapas de conversão usando a resposta real de /api/test/options
      const schoolMap = new Map(
        (optionsData.schools || []).map((s: any) => [s.id, s.name])
      );
      const gradeMap = new Map(
        (optionsData.schoolLevels || []).map((l: any) => [
          l.id,
          `${l.year} — ${l.description}`,
        ])
      );

      // Funções auxiliares para resolução dos nomes
      const resolveSchool = (idOrName: string) => schoolMap.get(idOrName) || idOrName || "—";
      const resolveGrade = (idOrName: string) => gradeMap.get(idOrName) || idOrName || "—";

      // Janela temporária formatada para impressão do documento PDF
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Por favor, permita pop-ups para gerar o relatório em PDF.");
        return;
      }

      const rowsHtml = allStudents
        .map(
          (s: any, idx: number) => `
          <tr style="border-bottom: 1px solid #ddd; font-size: 12px;">
            <td style="padding: 6px;">${idx + 1}</td>
            <td style="padding: 6px; font-weight: bold;">${s.fullName || "—"}</td>
            <td style="padding: 6px;">${resolveSchool(s.schoolName)}</td>
            <td style="padding: 6px;">${resolveGrade(s.schoolLevel)}</td>
            <td style="padding: 6px;">${s.profile?.name || "—"}</td>
          </tr>`
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Relatório Completo - Teste Vocacional UTFPR</title>
            <style>
              body { font-family: sans-serif; margin: 20px; color: #111; }
              h1 { font-size: 18px; margin-bottom: 4px; }
              p { font-size: 12px; color: #555; margin-top: 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th { background-color: #f2f2f2; text-align: left; padding: 8px; font-size: 11px; text-transform: uppercase; border-bottom: 2px solid #ccc; }
              @page { size: A4 portrait; margin: 15mm; }
            </style>
          </head>
          <body>
            <h1>UTFPR Câmpus Campo Mourão — Relatório Geral de Estudantes</h1>
            <p>Gerado em: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")} | Total de registros: ${allStudents.length}</p>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome do Aluno</th>
                  <th>Escola</th>
                  <th>Série / Nível</th>
                  <th>Curso Indicado</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      window.print();
    }
  };

  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-track text-text-muted font-label-sm text-label-sm uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            UTFPR-CM • Acesso Restrito
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-card text-primary-container font-label-sm text-label-sm">
            PAINEL DE CONTROLE ADMINISTRATIVO
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
          <Icon name="calendar_today" className="text-[18px]" />
          <span>Feira de Profissões</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-1 max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg text-text-high-contrast tracking-tight">
            Gestão de Respostas do Teste Vocacional
          </h1>
          <p className="font-body-md text-body-md text-text-muted">
            Monitore o engajamento dos estudantes, exporte relatórios
            consolidados e gerencie dados para orientar futuras turmas dos
            cursos de graduação da UTFPR Câmpus Campo Mourão.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-card hover:bg-surface-track text-text-high-contrast font-label-md text-label-md transition-all shadow-sm disabled:opacity-60"
          >
            <Icon
              name="refresh"
              className={`text-[18px] text-text-muted ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span>{isRefreshing ? "Atualizando..." : "Atualizar Dados"}</span>
          </button>
	  <button
        type="button"
        onClick={handleExportCSV}
        disabled={isExportingCsv}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-card hover:bg-surface-track text-text-high-contrast font-label-md text-label-md transition-all shadow-sm disabled:opacity-50"
      >
        <Icon
          name={isExportingCsv ? "sync" : "download"}
          className={`text-[18px] text-text-muted ${isExportingCsv ? "animate-spin" : ""}`}
        />
        <span>{isExportingCsv ? "Exportando..." : "Exportar CSV"}</span>
      </button>

      <button
        type="button"
        onClick={handlePrintPDF}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-card hover:bg-surface-track text-text-high-contrast font-label-md text-label-md transition-all shadow-sm"
      >
        <Icon
          name="picture_as_pdf"
          className="text-[18px] text-text-muted"
        />
        <span>Relatório PDF</span>
      </button>
          <button
            type="button"
            onClick={onNewResponse}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:bg-brand-yellow-hover active:scale-[0.98] transition-all shadow-md"
          >
            <Icon name="add" className="text-[20px]" />
            <span>Nova Resposta Manual</span>
          </button>
        </div>
      </div>
    </header>
  );
}
