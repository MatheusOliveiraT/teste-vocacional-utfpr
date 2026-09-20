"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DuelTopProgress } from "@/components/duel/DuelTopProgress";
import { DuelHeader } from "@/components/duel/DuelHeader";
import { DuelOptionCard } from "@/components/duel/DuelOptionCard";
import { OrDivider } from "@/components/duel/OrDivider";
import { DuelContextStrip } from "@/components/duel/DuelContextStrip";
import { DuelFooterNav } from "@/components/duel/DuelFooterNav";

export interface DuelOption {
  id: string;
  text: string;
}

export interface DuelQuestion {
  id: string;
  order: number;
  options: [DuelOption, DuelOption];
}

type Selection = "A" | "B" | null;

export function DuelScreen() {
  const router = useRouter();

  // Estados para gerenciar as questões vindas da API
  const [questions, setQuestions] = useState<DuelQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de navegação do quiz
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selection, setSelection] = useState<Selection>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Armazena o mapeamento das respostas selecionadas: [questionId]: optionId
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // 1. Fetch das questões na API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${apiUrl}/api/test/questions`);

        if (!res.ok) {
          throw new Error("Não foi possível carregar as questões do teste.");
        }

        const data: DuelQuestion[] = await res.json();
        setQuestions(data);
      } catch (err: any) {
        setError(err.message || "Erro de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[questionIdx];
  const percent = totalQuestions > 0 ? ((questionIdx + 1) / totalQuestions) * 100 : 0;
  const isLast = questionIdx === totalQuestions - 1;

  // 2. Manipulação da Seleção e Submissão para o Backend
  const handleSelect = useCallback(
    (key: "A" | "B") => {
      if (isTransitioning || !currentQuestion || submitting) return;

      setSelection(key);
      setIsTransitioning(true);

      const selectedOption = key === "A" ? currentQuestion.options[0] : currentQuestion.options[1];

      // Atualiza o dicionário de respostas
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption.id,
      };
      setAnswers(updatedAnswers);

      setTimeout(async () => {
        if (isLast) {
          try {
            setSubmitting(true);

            // Recupera os dados do estudante gravados na primeira etapa (IdentificationForm)
            const fullName = sessionStorage.getItem("utfpr_voc_name") || "";
            const schoolLevel = sessionStorage.getItem("utfpr_voc_grade") || "";
            const schoolName = sessionStorage.getItem("utfpr_voc_school") || "";

            // Extrai a lista simples de IDs das opções escolhidas
            const selectedOptionIds = Object.values(updatedAnswers);

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const response = await fetch(`${apiUrl}/api/test/submit`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fullName,
                schoolLevel,
                schoolName,
                selectedOptionIds,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Erro ao processar e salvar o resultado.");
            }

            const resultData = await response.json();

            // Salva o resultado retornado do banco no localStorage para a tela /resultado
            localStorage.setItem("utfpr_voc_result", JSON.stringify(resultData));

            router.push("/resultado");
          } catch (err: any) {
            setError(err.message || "Ocorreu um erro ao enviar seu teste.");
            setIsTransitioning(false);
            setSubmitting(false);
          }
          return;
        }

        setQuestionIdx((idx) => idx + 1);
        setSelection(null);
        setIsTransitioning(false);
      }, 650);
    },
    [isTransitioning, currentQuestion, isLast, answers, submitting, router]
  );

  const handlePrev = useCallback(() => {
    if (questionIdx === 0 || submitting) return;
    setQuestionIdx((idx) => idx - 1);
    setSelection(null);
    setIsTransitioning(false);
  }, [questionIdx, submitting]);

  // 3. Atalhos de Teclado
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = (e.target as HTMLElement)?.tagName;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target)) return;

      const key = e.key.toUpperCase();
      if (key === "A" || e.key === "ArrowLeft") {
        e.preventDefault();
        handleSelect("A");
      } else if (key === "B" || e.key === "ArrowRight") {
        e.preventDefault();
        handleSelect("B");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSelect]);

  // Tela de Carregamento Inicial ou de Submissão
  if (loading || submitting) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-on-surface">
        <div className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin" />
        <p className="font-body-md text-text-muted">
          {submitting ? "Calculando seu perfil vocacional..." : "Carregando duelos do teste..."}
        </p>
      </div>
    );
  }

  // Tela de Erro
  if (error || !currentQuestion) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-status-error font-semibold">{error || "Nenhuma questão encontrada."}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-container text-on-primary-container font-semibold rounded-lg hover:bg-brand-yellow-hover transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const [optionA, optionB] = currentQuestion.options;

  return (
    <div className="flex flex-col w-full">
      <DuelTopProgress percent={percent} />

      <section className="w-full max-w-[1140px] mx-auto px-gutter-desktop py-space-xl flex flex-col justify-center min-h-[calc(100vh-5rem)] select-none">
        <DuelHeader
          index={questionIdx + 1}
          total={totalQuestions}
          question="Qual destas atividades você prefere?"
          subtitle="Escolha a opção que mais combina com seu gosto ou interesse pessoal"
        />

        <div className="max-w-4xl w-full mx-auto my-space-xl relative">
          <OrDivider variant="floating" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative">
            <DuelOptionCard
              option={{
                id: optionA.id,
                label: optionA.text,
                key: "A",
                icon: "task_alt",
              }}
              label="Opção A"
              state={
                selection === "A"
                  ? "selected"
                  : selection === "B"
                  ? "dimmed"
                  : "idle"
              }
              onSelect={() => handleSelect("A")}
            />

            <OrDivider variant="inline" />

            <DuelOptionCard
              option={{
                id: optionB.id,
                label: optionB.text,
                key: "B",
                icon: "task_alt",
              }}
              label="Opção B"
              state={
                selection === "B"
                  ? "selected"
                  : selection === "A"
                  ? "dimmed"
                  : "idle"
              }
              onSelect={() => handleSelect("B")}
            />
          </div>
        </div>

        <DuelContextStrip label="Selecione usando o clique ou as teclas A / B / Setas do teclado" />

        <DuelFooterNav
          percent={percent}
          index={questionIdx + 1}
          total={totalQuestions}
          onPrev={handlePrev}
          canGoPrev={questionIdx > 0}
        />
      </section>
    </div>
  );
}