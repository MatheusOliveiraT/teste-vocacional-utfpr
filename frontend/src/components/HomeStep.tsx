'use client';

interface HomeStepProps {
  onStart: () => void;
}

export default function HomeStep({ onStart }: HomeStepProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-[#0D1117] text-[#F0F6FC]">
      <div className="max-w-2xl w-full bg-[#161B22] border border-[#30363D] rounded-xl p-6 sm:p-10 text-center shadow-2xl">
        {/* Badge Institucional */}
        <div className="inline-block px-3 py-1 mb-6 bg-[#FFC709]/10 border border-[#FFC709]/30 rounded-full text-[#FFC709] text-xs font-semibold uppercase tracking-wider">
          UTFPR — Câmpus Campo Mourão
        </div>

        {/* Título Principal */}
        <h1 className="text-2xl sm:text-4xl font-bold text-[#F0F6FC] mb-4 leading-tight">
          Descubra seu Futuro na UTFPR
        </h1>

        {/* Descrição */}
        <p className="text-[#8B949E] text-base sm:text-lg mb-8 leading-relaxed">
          Descubra qual dos <span className="text-[#F0F6FC] font-medium">10 cursos de graduação</span> do câmpus combina mais com o seu perfil através de escolhas simples e rápidas.
        </p>

        {/* Chips de Destaque */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#8B949E] font-medium flex items-center justify-center gap-2">
            <span>⚡</span> 36 Duelos Rápidos
          </div>
          <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#8B949E] font-medium flex items-center justify-center gap-2">
            <span>🎓</span> 10 Cursos Oficiais
          </div>
          <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#8B949E] font-medium flex items-center justify-center gap-2">
            <span>📊</span> Resultado Imediato
          </div>
        </div>

        {/* Botão de Ação */}
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 bg-[#FFC709] hover:bg-[#E0A800] text-[#0D1117] font-bold text-base rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#FFC709]/10"
        >
          Iniciar Teste Vocacional →
        </button>
      </div>

      <footer className="mt-8 text-xs text-[#8B949E] text-center">
        Universidade Tecnológica Federal do Paraná — Câmpus Campo Mourão
      </footer>
    </div>
  );
}