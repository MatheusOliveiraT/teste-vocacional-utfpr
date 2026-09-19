'use client';

interface CourseMatch {
  courseId: string;
  courseName: string;
  description: string;
  percentage: number;
}

interface ResultsStepProps {
  results: {
    winner: CourseMatch;
    ranking: CourseMatch[];
  };
  studentName: string;
  onRestart: () => void;
}

export default function ResultsStep({ results, studentName, onRestart }: ResultsStepProps) {
  const { winner, ranking } = results;

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-utfpr-dark max-w-3xl mx-auto">
      {/* Top Badge */}
      <div className="text-center mb-8">
        <div className="inline-block px-3 py-1 bg-utfpr-yellow/10 border border-utfpr-yellow/30 rounded-full text-utfpr-yellow text-xs font-semibold uppercase tracking-wider mb-3">
          Seu Resultado Está Pronto!
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-utfpr-text">
          Parabéns, {studentName}!
        </h1>
      </div>

      {/* Main Winner Card */}
      <div className="bg-utfpr-card border-2 border-utfpr-yellow rounded-xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-utfpr-yellow text-utfpr-dark font-bold text-xs px-4 py-1 rounded-bl-lg uppercase">
          Maior Compatibilidade
        </div>

        <span className="text-xs font-semibold text-utfpr-subtle uppercase tracking-wider block mb-1">
          Curso Recomendado na UTFPR-CM
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-utfpr-yellow mb-2">
          {winner.courseName}
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-utfpr-dark border border-utfpr-border rounded-lg text-utfpr-text text-sm font-semibold mb-4">
          🎯 {winner.percentage}% de Afinidade
        </div>
        <p className="text-utfpr-subtle text-sm sm:text-base leading-relaxed mb-6">
          {winner.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://www.utfpr.edu.br/campi/campomourao/cursos/graduacao"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-utfpr-yellow hover:bg-utfpr-yellow-hover text-utfpr-dark font-bold text-sm rounded-lg text-center transition-colors"
          >
            Ver Detalhes do Curso na UTFPR
          </a>
        </div>
      </div>

      {/* Ranking Geral de Cursos */}
      <div className="bg-utfpr-card border border-utfpr-border rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-utfpr-text mb-4">
          Sua Afinidade com Todos os Cursos da UTFPR-CM
        </h3>

        <div className="space-y-4">
          {ranking.map((item, index) => (
            <div key={item.courseId}>
              <div className="flex justify-between items-center text-sm font-medium text-utfpr-text mb-1">
                <span>
                  <span className="text-utfpr-subtle mr-2">#{index + 1}</span>
                  {item.courseName}
                </span>
                <span className="font-bold text-utfpr-yellow">{item.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-utfpr-dark rounded-full overflow-hidden border border-utfpr-border">
                <div
                  className="h-full bg-gradient-to-r from-utfpr-yellow/60 to-utfpr-yellow transition-all duration-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão de Ação do Rodapé */}
      <div className="text-center pb-8">
        <button
          onClick={onRestart}
          className="px-6 py-3 border border-utfpr-border hover:border-utfpr-yellow text-utfpr-subtle hover:text-utfpr-text font-semibold text-sm rounded-lg transition-colors"
        >
          🔄 Refazer o Teste Vocacional
        </button>
      </div>
    </div>
  );
}