"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { FormField } from "@/components/identification/FormField";
import { FormSelect } from "@/components/identification/FormSelect";
import { PrivacyNotice } from "@/components/identification/PrivacyNotice";
import { FormActions } from "@/components/identification/FormActions";
import { GRADE_OPTIONS, SCHOOL_OPTIONS } from "@/data/identification";

interface FormErrors {
  name?: string;
  grade?: string;
  school?: string;
}

/**
 * Formulário de identificação do estudante (Etapa 1 de 2). Controla o estado
 * dos campos, valida antes de avançar e navega para a tela de duelos.
 */
export function IdentificationForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // sessionStorage pode não estar disponível; segue o fluxo normalmente
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
          placeholder="Selecione seu ano/série..."
          required
          value={grade}
          options={GRADE_OPTIONS}
          onChange={setGrade}
          error={errors.grade}
        />

        <FormSelect
          id="student-school"
          name="student-school"
          label="Sua Escola / Colégio"
          icon="domain"
          placeholder="Selecione sua escola em Campo Mourão..."
          required
          value={school}
          options={SCHOOL_OPTIONS}
          onChange={setSchool}
          error={errors.school}
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
