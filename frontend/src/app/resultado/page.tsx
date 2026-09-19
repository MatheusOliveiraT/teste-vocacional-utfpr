import { ResultHeader } from "@/components/result/ResultHeader";
import { WinnerCard } from "@/components/result/WinnerCard";
import { RankingSection } from "@/components/result/RankingSection";
import { CampusBanner } from "@/components/result/CampusBanner";
import { ResultActionFooter } from "@/components/result/ResultActionFooter";

export const metadata = {
  title: "Resultado do Diagnóstico Vocacional — UTFPR",
};

export default function ResultPage() {
  return (
    <div className="max-w-[1140px] w-full mx-auto px-margin md:px-gutter-desktop py-space-xl flex flex-col gap-space-2xl">
      <ResultHeader />
      <WinnerCard />
      <RankingSection />
      <CampusBanner />
      <ResultActionFooter />
    </div>
  );
}
