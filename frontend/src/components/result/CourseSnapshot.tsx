"use client";

import { useEffect, useState } from "react";
import { ImageCaptionCard } from "@/components/ui/ImageCaptionCard";
import { VocationalProfileCard } from "@/components/result/VocationalProfileCard";

interface ProfileData {
  id?: string;
  name?: string;
  description?: string;
  traits?: string[];
  skills?: string[];
}

interface TestResultData {
  winningProfile?: ProfileData;
  topCourse?: {
    name?: string;
    description?: string;
    snapshotImage?: {
      src: string;
      alt: string;
      caption: string;
      icon?: string;
    };
    profile?: {
      title?: string;
      description?: string;
      imageUrl?: string;
      tags?: string[];
    };
  };
}

export function CourseSnapshot() {
  const [result, setResult] = useState<TestResultData | null>(null);

  useEffect(() => {
    try {
      const storedResult = localStorage.getItem("utfpr_voc_result");
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      }
    } catch (e) {
      console.error("Erro ao carregar os detalhes do perfil vocacional:", e);
    }
  }, []);

  // Prepara os dados de imagem a partir do resultado ou fallback válido
  const snapshotImage = result?.topCourse?.snapshotImage || {
    // Aponta para um SVG/PNG válido na public/ ou usa o Unsplash de placeholder
    src: result?.winningProfile?.imageUrl ||"https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    alt: result?.winningProfile?.name || "Ambiente Acadêmico UTFPR-CM",
    caption: result?.winningProfile?.name || "Câmpus Campo Mourão",
    icon: "location_on",
  };

  // Prepara os dados do perfil vocacional associado ao curso vencedor
  const profile = {
    title: result?.topCourse?.profile?.title || "Perfil do Ingressante",
    description:
      result?.winningProfile?.description ||
      result?.topCourse?.description ||
      "Perfil focado em inovação, resolução de problemas complexos e aplicação prática da tecnologia no mercado.",
    tags: result?.topCourse?.profile?.tags || [
      "Raciocínio Lógico",
      "Tecnologia",
      "Inovação",
      "Solução de Problemas",
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md pt-space-xs">
      <ImageCaptionCard
        src={snapshotImage.src}
        alt={snapshotImage.alt}
        caption={snapshotImage.caption}
        captionIcon={snapshotImage.icon}
        aspectClassName="h-48 aspect-auto"
        className="lg:col-span-8"
      />
      <VocationalProfileCard {...profile} />
    </div>
  );
}