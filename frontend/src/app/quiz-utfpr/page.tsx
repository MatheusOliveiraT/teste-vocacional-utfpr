"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { UTFPR_QUIZ_QUESTIONS, QuizQuestion } from "@/data/utfpr-quiz";

const QUESTION_TIMEOUT_SECONDS = 30;
const TOTAL_QUIZ_QUESTIONS = 10; // Seleciona apenas 10 questões aleatórias do banco

export default function QuizUtfprPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMEOUT_SECONDS);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Embaralha e recorta exatamente 10 questões do banco de dados
  const initQuiz = useCallback(() => {
    const shuffled = [...UTFPR_QUIZ_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_QUIZ_QUESTIONS);
    setQuestions(shuffled);
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(QUESTION_TIMEOUT_SECONDS);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const handleStartQuiz = () => {
    initQuiz();
    setHasStarted(true);
  };

  // Processa a resposta e avança para a próxima pergunta
  const handleNext = useCallback(() => {
    const currentQuestion = questions[currentIdx];

    if (
      selectedOption !== null &&
      selectedOption === currentQuestion?.correctAnswer
    ) {
      setScore((prev) => prev + 1);
    }

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(QUESTION_TIMEOUT_SECONDS);
    } else {
      setIsFinished(true);
    }
  }, [currentIdx, questions, selectedOption]);

  // Efeito do Temporizador de 30 segundos por questão (SÓ RODA QUANDO HASSTARTED FOR TRUE)
  useEffect(() => {
    if (!hasStarted || isFinished || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
          return QUESTION_TIMEOUT_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx, hasStarted, isFinished, questions.length, handleNext]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <p className="text-text-muted font-body-md">Carregando quiz...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const totalQuestions = questions.length;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-[800px] mx-auto flex flex-col justify-center text-on-surface">
      {!hasStarted ? (
        /* Tela Inicial do Quiz */
        <div className="bg-surface-card p-8 md:p-10 rounded-2xl shadow-md border border-border-subtle flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-container/20 text-primary-container flex items-center justify-center">
            <Icon name="quiz" className="text-4xl" />
          </div>

          <div className="flex flex-col gap-2 max-w-lg">
            <h1 className="font-headline-md text-headline-md text-text-high-contrast">
              Quiz de Conhecimentos UTFPR
            </h1>
            <p className="font-body-md text-text-muted">
              Teste seus conhecimentos sobre o câmpus Campo Mourão, nossos cursos de graduação, história e novidades!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl my-2">
            <div className="p-3.5 bg-surface-track rounded-xl border border-border-subtle flex flex-col items-center gap-1">
              <Icon name="format_list_numbered" className="text-primary-container text-xl" />
              <span className="font-label-md font-bold text-text-high-contrast">10 Perguntas</span>
              <span className="font-label-sm text-text-muted">Sorteadas ao acaso</span>
            </div>
            <div className="p-3.5 bg-surface-track rounded-xl border border-border-subtle flex flex-col items-center gap-1">
              <Icon name="timer" className="text-primary-container text-xl" />
              <span className="font-label-md font-bold text-text-high-contrast">30 Segundos</span>
              <span className="font-label-sm text-text-muted">Por questão</span>
            </div>
            <div className="p-3.5 bg-surface-track rounded-xl border border-border-subtle flex flex-col items-center gap-1">
              <Icon name="school" className="text-primary-container text-xl" />
              <span className="font-label-md font-bold text-text-high-contrast">UTFPR-CM</span>
              <span className="font-label-sm text-text-muted">Feira de Profissões</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button
              type="button"
              onClick={handleStartQuiz}
              className="w-full py-4 rounded-xl bg-primary-container text-surface-base font-label-lg font-bold hover:bg-brand-yellow-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Iniciar Quiz Agora</span>
              <Icon name="play_arrow" className="text-2xl" />
            </button>
          </div>
        </div>
      ) : !isFinished ? (
        /* Pergunta Ativa do Quiz */
        <div className="bg-surface-card p-6 md:p-8 rounded-2xl shadow-md border border-border-subtle flex flex-col gap-6">
          {/* Header do Quiz com o Temporizador */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2">
              <Icon name="quiz" className="text-primary-container text-2xl" />
              <h1 className="font-headline-sm text-headline-sm text-text-high-contrast">
                Quiz UTFPR-CM
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Cronômetro Regressivo */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold font-mono text-sm border ${
                  timeLeft <= 5
                    ? "bg-status-error/10 text-status-error border-status-error/40 animate-pulse"
                    : "bg-surface-track text-primary-container border-border-subtle"
                }`}
              >
                <Icon name="timer" className="text-[18px]" />
                <span>{timeLeft}s</span>
              </div>

              <span className="font-label-md text-text-muted">
                {currentIdx + 1}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* Barra de Progresso Visual do Tempo */}
          <div className="w-full h-1.5 bg-surface-track rounded-full overflow-hidden -mt-2">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 5 ? "bg-status-error" : "bg-primary-container"
              }`}
              style={{
                width: `${(timeLeft / QUESTION_TIMEOUT_SECONDS) * 100}%`,
              }}
            />
          </div>

          {/* Pergunta */}
          <h2 className="font-headline-sm text-lg md:text-xl text-text-high-contrast">
            {currentQuestion.question}
          </h2>

          {/* Renderiza a imagem da questão (caso exista) */}
          {currentQuestion.image && (
            <div className="flex justify-center my-2">
              <img
                src={currentQuestion.image}
                alt="Imagem da questão"
                className="max-h-48 rounded-lg object-contain border border-border-subtle p-2 bg-white"
              />
            </div>
          )}

          {/* Opções de Resposta */}
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-left font-body-md transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-primary-container/20 border-primary-container text-text-high-contrast font-semibold"
                      : "bg-surface-track text-text-high-contrast border-border-subtle hover:border-primary-container/50"
                  }`}
                >
                  <span>{option}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-primary-container bg-primary-container text-surface-base"
                        : "border-border-subtle"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-surface-base" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botão de Avançar */}
          <div className="pt-2">
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl bg-primary-container text-surface-base font-label-lg font-bold hover:bg-brand-yellow-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {currentIdx + 1 < totalQuestions
                  ? "Confirmar e Avançar"
                  : "Finalizar Quiz"}
              </span>
              <Icon name="arrow_forward" className="text-xl" />
            </button>
          </div>
        </div>
      ) : (
        /* Tela Final de Conclusão */
        <div className="bg-surface-card p-8 rounded-2xl shadow-md border border-border-subtle flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-container/20 text-primary-container flex items-center justify-center">
            <Icon name="emoji_events" className="text-4xl" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-headline-md text-headline-md text-text-high-contrast">
              Quiz Concluído!
            </h1>
            <p className="font-body-md text-text-muted">
              Você acertou{" "}
              <strong className="text-primary-container">{score}</strong> de{" "}
              <strong>{totalQuestions}</strong> questões sobre a UTFPR Câmpus
              Campo Mourão.
            </p>
          </div>

          {/* Botões para Retornar à Home ou Fazer o Teste Vocacional */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4">
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl border border-border-subtle bg-surface-track hover:bg-surface-bright text-text-high-contrast font-label-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Icon name="home" className="text-xl" />
              <span>Voltar ao Início</span>
            </Link>

            <Link
              href="/identificacao"
              className="flex-1 py-3 px-4 rounded-xl bg-primary-container text-surface-base hover:bg-brand-yellow-hover font-label-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              <Icon name="psychology" className="text-xl" />
              <span>Fazer Teste Vocacional</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={initQuiz}
            className="text-text-muted hover:text-text-high-contrast font-label-sm underline mt-2 transition-colors cursor-pointer"
          >
            Refazer o Quiz (Outras 10 Perguntas)
          </button>
        </div>
      )}
    </div>
  );
}