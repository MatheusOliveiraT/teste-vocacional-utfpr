// src/app/page.tsx (Exemplo de Orquestração das Telas)
'use client';

import { useState } from 'react';
import HomeStep from '@/components/HomeStep';
import StudentFormStep from '@/components/StudentFormStep';
import QuizDuelsStep from '@/components/QuizDuelsStep';
import ResultsStep from '@/components/ResultsStep';

export default function VocationalTestPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [studentData, setStudentData] = useState({ name: '', schoolId: '', levelId: '' });
  const [quizResults, setQuizResults] = useState<any>(null);

  return (
    <main className="min-h-screen bg-utfpr-dark text-utfpr-text font-sans antialiased">
      {step === 1 && <HomeStep onStart={() => setStep(2)} />}
      
      {step === 2 && (
        <StudentFormStep 
          onSubmit={(data) => {
            setStudentData(data);
            setStep(3);
          }} 
          onBack={() => setStep(1)} 
        />
      )}

      {step === 3 && (
        <QuizDuelsStep 
          studentData={studentData}
          onFinish={(results) => {
            setQuizResults(results);
            setStep(4);
          }} 
        />
      )}

      {step === 4 && (
        <ResultsStep 
          results={quizResults} 
          studentName={studentData.name}
          onRestart={() => setStep(1)} 
        />
      )}
    </main>
  );
}