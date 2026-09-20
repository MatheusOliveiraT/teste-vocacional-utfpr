"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { FormField } from "@/components/identification/FormField";
import { FormSelect } from "@/components/identification/FormSelect";
import { PrivacyNotice } from "@/components/identification/PrivacyNotice";
import { FormActions } from "@/components/identification/FormActions";

interface SelectOption {
  value: string;
  label: string;
}

interface School {
  id: string;
  name: string;
}

interface SchoolLevel {
  id: string;
  year: string;
  description: string;
}

interface ApiResponse {
  schools: School[];
  schoolLevels: SchoolLevel[];
}

interface FormErrors {
  name?: string;
  grade?: string;
  school?: string;
}

export function IdentificationForm() {
  const router = useRouter();

  // Estados dos campos do formulário
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para armazenar as opções dinamicas da API
  const [gradeOptions, setGradeOptions] = useState<SelectOption[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Busca escolas e níveis de escolaridade no endpoint único
  useEffect(() => {
    async function loadFormOptions() {
      try {
        setLoadingOptions(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        const res = await fetch(`${apiUrl}/api/test/options`);

        if (!res.ok) {
          throw new Error("Falha ao buscar opções de cadastro.");
        }

        const data: ApiResponse = await res.json();

        // Mapeia as escolas -> { value: id, label: name }
        if (data.schools) {
          const formattedSchools: SelectOption[] = data.schools.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setSchoolOptions(formattedSchools);
        }

        // Mapeia os níveis -> { value: id, label: "1º ano - Ensino Médio" }
        if (data.schoolLevels) {
          const formattedGrades: SelectOption[] = data.schoolLevels.map((item) => ({
            value: item.id,
            label: `${item.year} - ${item.description}`,
          }));
          setGradeOptions(formattedGrades);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do formulário:", error);
      } finally {
        setLoadingOptions(false);
      }
    }

    loadFormOptions();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Por favor, insira o seu nome completo.";
    }
    if (!grade) {
      nextErrors.grade = "Selecione sua série/escolaridade.";
    }
    if (!school) {
      nextErrors.school = "Selecione sua escola.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      sessionStorage.setItem("utfpr_voc_name", name.trim());
      sessionStorage.setItem("utfpr_voc_grade", grade);
      sessionStorage.setItem("utfpr_voc_school", school);
    } catch {
      // sessionStorage indisponível
    }

    setTimeout(() => {
      router.push("/duelo");
    }, 350);
  }

  return (
    <Card
      as="section"
      className="p-space-lg md:p-space-xl flex flex-col gap-space-lg shadow-xl relative overflow-hidden"
      style={{ border: "1.5px solid #30363D" }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-container/10 via-transparent to-transparent pointer-events-none" />

      <header className="flex flex-col gap-space-xs relative z-10">
        <div className="inline-flex items-center gap-1.5 text-text-muted font-label-sm text-label-sm">
          <Icon name="badge" className="text-primary-container text-[18px]" />
          <span>Perfil Vocacional</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-text-high-contrast tracking-tight">
          Antes de começar, queremos te conhecer!
        </h1>
        <p className="font-body-md text-body-md text-text-muted">
          Preencha seus dados para personalizarmos o resultado do seu teste e
          indicar as melhores trilhas na UTFPR.
        </p>
      </header>

      <form
        className="flex flex-col gap-space-md"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormField
          id="student-name"
          name="student-name"
          label="Nome Completo"
          icon="account_circle"
          placeholder="Ex: Matheus Silva"
          required
          value={name}
          onChange={setName}
          error={errors.name}
        />

        <FormSelect
          id="student-grade"
          name="student-grade"
          label="Série / Escolaridade"
          icon="school"
          placeholder={
            loadingOptions
              ? "Carregando escolaridades..."
              : "Selecione seu ano/série..."
          }
          required
          value={grade}
          options={gradeOptions}
          onChange={setGrade}
          error={errors.grade}
          disabled={loadingOptions}
        />

        <FormSelect
          id="student-school"
          name="student-school"
          label="Sua Escola / Colégio"
          icon="domain"
          placeholder={
            loadingOptions
              ? "Carregando escolas..."
              : "Selecione sua escola em Campo Mourão..."
          }
          required
          value={school}
          options={schoolOptions}
          onChange={setSchool}
          error={errors.school}
          disabled={loadingOptions}
        />

        <PrivacyNotice>
          Seus dados serão utilizados apenas para fins estatísticos
          educacionais e personalização do relatório.
        </PrivacyNotice>

        <FormActions
          backHref="/"
          backLabel="Voltar para o início"
          submitLabel="Começar os Duelos Vocacionais"
          loadingLabel="Carregando duelos..."
          isSubmitting={isSubmitting}
        />
      </form>
    </Card>
  );
}