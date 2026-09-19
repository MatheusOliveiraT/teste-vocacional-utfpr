"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DuelTopProgress } from "@/components/duel/DuelTopProgress";
import { DuelHeader } from "@/components/duel/DuelHeader";
import { DuelOptionCard } from "@/components/duel/DuelOptionCard";
import { OrDivider } from "@/components/duel/OrDivider";
import { DuelContextStrip } from "@/components/duel/DuelContextStrip";
import { DuelFooterNav } from "@/components/duel/DuelFooterNav";
import { DUEL_QUESTIONS } from "@/data/duels";

type Selection = "A" | "B" | null;

export function DuelScreen() {
  const router = useRouter();
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selection, setSelection] = useState<Selection>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = DUEL_QUESTIONS[questionIdx];
  const percent = (question.index / question.total) * 100;
  const isLast = questionIdx === DUEL_QUESTIONS.length - 1;

  const handleSelect = useCallback(
    (key: "A" | "B") => {
      if (isTransitioning) return;
      setSelection(key);
      setIsTransitioning(true);

      setTimeout(() => {
        if (isLast) {
          router.push("/resultado");
          return;
        }
        setQuestionIdx((idx) => idx + 1);
        setSelection(null);
        setIsTransitioning(false);
      }, 650);
    },
    [isTransitioning, isLast, router]
  );

  const handlePrev = useCallback(() => {
    if (questionIdx === 0) return;
    setQuestionIdx((idx) => idx - 1);
    setSelection(null);
    setIsTransitioning(false);
  }, [questionIdx]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = document.activeElement?.tagName;
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

  const [optionA, optionB] = question.options;

  return (
    <div className="flex flex-col w-full">
      <DuelTopProgress percent={percent} />

      <section className="w-full max-w-[1140px] mx-auto px-gutter-desktop py-space-xl flex flex-col justify-center min-h-[calc(100vh-5rem)] select-none">
        <DuelHeader
          index={question.index}
          total={question.total}
          question={question.question}
          subtitle={question.subtitle}
        />

        <div className="max-w-4xl w-full mx-auto my-space-xl relative">
          <OrDivider variant="floating" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative">
            <DuelOptionCard
              option={optionA}
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
              option={optionB}
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

        <DuelContextStrip label={question.contextLabel} />

        <DuelFooterNav
          percent={percent}
          index={question.index}
          total={question.total}
          onPrev={handlePrev}
          canGoPrev={questionIdx > 0}
        />
      </section>
    </div>
  );
}
