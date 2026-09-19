'use client';

import { useState, useEffect } from 'react';

interface SchoolOption {
  id: string;
  name: string;
}

interface EducationLevelOption {
  id: string;
  name: string;
}

interface StudentFormStepProps {
  onSubmit: (data: { name: string; schoolId: string; levelId: string }) => void;
  onBack: () => void;
}

export default function StudentFormStep({ onSubmit, onBack }: StudentFormStepProps) {
  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [levelId, setLevelId] = useState('');

  const [schools, setSchools] = useState<SchoolOption[]>([]);
  const [levels, setLevels] = useState<EducationLevelOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch('/api/test/options');
        const data = await res.json();
        setSchools(data.schools || []);
        setLevels(data.levels || []);
      } catch (err) {
        console.error('Erro ao carregar opções:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOptions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !schoolId || !levelId) return;
    onSubmit({ name, schoolId, levelId });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-utfpr-dark">
      <div className="max-w-xl w-full bg-utfpr-card border border-utfpr-border rounded-xl p-6 sm:p-8 shadow-2xl">
        <div className="text-xs uppercase font-semibold tracking-wider text-utfpr-yellow mb-2">
          Etapa 1 de 2
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-utfpr-text mb-2">
          Identificação do Estudante
        </h2>
        <p className="text-utfpr-subtle text-sm mb-6">
          Preencha seus dados para personalizar o resultado do seu teste vocacional.
        </p>

        {loading ? (
          <div className="text-center py-8 text-utfpr-subtle">Carregando formulário...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-utfpr-text mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Matheus Silva"
                className="w-full px-4 py-3 bg-utfpr-dark border border-utfpr-border rounded-lg text-utfpr-text placeholder-utfpr-subtle focus:outline-none focus:border-utfpr-yellow transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-utfpr-text mb-1">
                Ano / Escolaridade
              </label>
              <select
                required
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
                className="w-full px-4 py-3 bg-utfpr-dark border border-utfpr-border rounded-lg text-utfpr-text focus:outline-none focus:border-utfpr-yellow transition-colors"
              >
                <option value="">Selecione sua escolaridade...</option>
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-utfpr-text mb-1">
                Sua Escola / Colégio
              </label>
              <select
                required
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="w-full px-4 py-3 bg-utfpr-dark border border-utfpr-border rounded-lg text-utfpr-text focus:outline-none focus:border-utfpr-yellow transition-colors"
              >
                <option value="">Selecione sua escola em Campo Mourão...</option>
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-4 py-3 text-sm text-utfpr-subtle hover:text-utfpr-text transition-colors"
              >
                ← Voltar
              </button>
              <button
                type="submit"
                disabled={!name.trim() || !schoolId || !levelId}
                className="w-full sm:w-auto px-6 py-3 bg-utfpr-yellow hover:bg-utfpr-yellow-hover disabled:opacity-50 text-utfpr-dark font-bold text-sm rounded-lg transition-colors"
              >
                Começar os Duelos →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}