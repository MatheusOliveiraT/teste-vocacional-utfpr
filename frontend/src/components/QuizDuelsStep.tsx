'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  optionA: { text: string; courseId: string };
  optionB: { text: string; courseId: string };
}

interface QuizDuelsStepProps {
  studentData: { name: string; schoolId: string; levelId: string };
  onFinish: (results: any) => void;
}

export default function QuizDuelsStep({ studentData, onFinish }: QuizDuelsStepProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('/api/test/questions');
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error('Erro ao buscar perguntas:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleSelectOption = (courseId: string) => {
    const updatedAnswers = { ...answers, [questions[currentIndex].id]: courseId };
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: Record<number, string>) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: studentData,
          answers: finalAnswers,
        }),
      });
      const data = await res.json();
      onFinish(data);
    } catch (err) {
      console.error('Erro ao enviar teste:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-utfpr-dark text-utfpr-text">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-utfpr-yellow mx-auto mb-4"></div>
          <p className="text-utfpr-subtle">
            {submitting ? 'Calculando sua compatibilidade vocacional...' : 'Preparando os duelos...'}
          </p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 bg-utfpr-dark max-w-4xl mx-auto">
      {/* Topo / Progresso */}
      <div className="w-full pt-4">
        <div className="flex justify-between items-center text-xs font-semibold uppercase text-utfpr-subtle mb-2">
          <span>Duelo {currentIndex + 1} de {questions.length}</span>
          <span>{progressPercent}% Concluído</span>
        </div>
        <div className="w-full h-2 bg-utfpr-card rounded-full overflow-hidden border border-utfpr-border">
          <div
            className="h-full bg-utfpr-yellow transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Pergunta Principal */}
      <div className="my-auto py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-utfpr-text mb-8">
          O que você prefere fazer?
        </h2>

        {/* Cards de Opção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Opção A */}
          <button
            onClick={() => handleSelectOption(currentQ.optionA.courseId)}
            className="group relative p-6 bg-utfpr-card border-2 border-utfpr-border hover:border-utfpr-yellow rounded-xl text-left transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-utfpr-yellow/5 flex flex-col justify-between"
          >
            <span className="text-xs font-semibold text-utfpr-yellow uppercase mb-3 block">
              Opção A
            </span>
            <p className="text-base sm:text-lg text-utfpr-text font-medium leading-relaxed mb-4">
              {currentQ.optionA.text}
            </p>
            <span className="text-xs text-utfpr-subtle group-hover:text-utfpr-yellow transition-colors font-semibold">
              Selecionar esta opção →
            </span>
          </button>

          {/* Opção B */}
          <button
            onClick={() => handleSelectOption(currentQ.optionB.courseId)}
            className="group relative p-6 bg-utfpr-card border-2 border-utfpr-border hover:border-utfpr-yellow rounded-xl text-left transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-utfpr-yellow/5 flex flex-col justify-between"
          >
            <span className="text-xs font-semibold text-utfpr-yellow uppercase mb-3 block">
              Opção B
            </span>
            <p className="text-base sm:text-lg text-utfpr-text font-medium leading-relaxed mb-4">
              {currentQ.optionB.text}
            </p>
            <span className="text-xs text-utfpr-subtle group-hover:text-utfpr-yellow transition-colors font-semibold">
              Selecionar esta opção →
            </span>
          </button>
        </div>
      </div>

      {/* Controles de Rodapé */}
      <div className="pb-4 flex justify-between items-center text-xs text-utfpr-subtle">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="disabled:opacity-30 hover:text-utfpr-text transition-colors"
        >
          ← Duelo Anterior
        </button>
        <span>Responda intuitivamente</span>
      </div>
    </div>
  );
}