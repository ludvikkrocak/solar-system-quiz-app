import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const quizData = [
  {
    question: 'Která planeta je nejblíže Slunci?',
    options: ['Venuše', 'Merkur', 'Země', 'Mars'],
    answer: 'Merkur'
  },
  {
    question: 'Která planeta je známá svými prstenci?',
    options: ['Jupiter', 'Saturn', 'Uran', 'Neptun'],
    answer: 'Saturn'
  },
  {
    question: 'Která planeta je největší v naší sluneční soustavě?',
    options: ['Země', 'Jupiter', 'Saturn', 'Neptun'],
    answer: 'Jupiter'
  },
  {
    question: 'Která planeta má červený povrch díky oxidu železa?',
    options: ['Mars', 'Merkur', 'Venuše', 'Země'],
    answer: 'Mars'
  },
  {
    question: 'Kolik planet má naše sluneční soustava?',
    options: ['7', '8', '9', '10'],
    answer: '8'
  }
];

export default function SolarSystemQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelected('');
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelected('');
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white p-4">
      <Card className="max-w-xl w-full bg-opacity-20 bg-black backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700">
        <CardContent className="p-6">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Otázka {currentQuestion + 1} z {quizData.length}
              </h2>
              <p className="text-lg mb-6 text-center">{quizData[currentQuestion].question}</p>

              <div className="grid grid-cols-1 gap-3">
                {quizData[currentQuestion].options.map((option) => (
                  <Button
                    key={option}
                    variant={selected === option ? 'secondary' : 'outline'}
                    onClick={() => handleAnswer(option)}
                    className={`p-3 text-lg rounded-xl transition-all duration-300 ${
                      selected === option ? 'bg-purple-600 text-white' : 'bg-transparent hover:bg-purple-800'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button
                  onClick={handleNext}
                  disabled={!selected}
                  className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                >
                  {currentQuestion + 1 === quizData.length ? 'Vyhodnotit' : 'Další otázka'}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Výsledky testu</h2>
              <p className="text-xl mb-4">
                Správně jsi zodpověděl {score} z {quizData.length} otázek.
              </p>
              <div className="text-lg mb-6">
                {score === quizData.length
                  ? '🌞 Perfektní! Jsi expert na sluneční soustavu!'
                  : score > 2
                  ? '🪐 Skvělý výsledek! Máš velmi dobré znalosti!'
                  : '☄️ Nevadí, můžeš to zkusit znovu a naučit se víc!'}
              </div>
              <Button
                onClick={handleRestart}
                className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 hover:opacity-90"
              >
                Zkusit znovu
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
