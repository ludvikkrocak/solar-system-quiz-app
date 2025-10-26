import React, { useState } from 'react';
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
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => setSelected(option);

  const handleNext = () => {
    if (selected === quizData[current].answer) setScore(score + 1);
    setSelected('');
    if (current + 1 < quizData.length) setCurrent(current + 1);
    else setFinished(true);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected('');
    setFinished(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-gray-700">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">
              Otázka {current + 1} z {quizData.length}
            </h2>
            <p className="text-lg mb-6 text-center">{quizData[current].question}</p>

            <div className="grid grid-cols-1 gap-3">
              {quizData[current].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`p-3 rounded-xl border border-purple-500 transition-all duration-300 ${
                    selected === option ? 'bg-purple-700 text-white' : 'hover:bg-purple-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleNext}
                disabled={!selected}
                className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 disabled:opacity-30"
              >
                {current + 1 === quizData.length ? 'Vyhodnotit' : 'Další otázka'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Výsledky testu</h2>
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
            <button
              onClick={restart}
              className="px-6 py-2 text-lg rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 hover:opacity-90"
            >
              Zkusit znovu
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
