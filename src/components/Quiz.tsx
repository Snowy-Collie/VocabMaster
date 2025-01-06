import React, { useState, useMemo } from 'react';
import { useWordStore } from '../store/words';
import { QuizType, FlashcardWord } from '../types';
import { Flashcard } from './Flashcard';

export function Quiz() {
  const { words, groups } = useWordStore();
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [flashcardWords, setFlashcardWords] = useState<FlashcardWord[]>([]);

  const groupWords = useMemo(
    () => words.filter((word) => word.groupId === selectedGroupId),
    [words, selectedGroupId]
  );

  const shuffledWords = useMemo(
    () => [...groupWords].sort(() => Math.random() - 0.5),
    [groupWords]
  );

  const currentWord = shuffledWords[currentWordIndex];

  const options = useMemo(() => {
    if (!currentWord) return [];
    const incorrect = shuffledWords
      .filter((w) => w.id !== currentWord.id)
      .slice(0, 3)
      .map((w) => w.chinese);
    return [...incorrect, currentWord.chinese].sort(() => Math.random() - 0.5);
  }, [currentWord, shuffledWords]);

  const initializeFlashcards = () => {
    setFlashcardWords(
      shuffledWords.map(word => ({
        ...word,
        status: 'unknown'
      }))
    );
  };

  const handleFlashcardResponse = (known: boolean) => {
    setFlashcardWords(prev => {
      const newWords = [...prev];
      newWords[currentWordIndex].status = known ? 'known' : 'unknown';
      return newWords;
    });

    // Find next unknown word
    const remainingUnknown = flashcardWords.filter(
      (w, i) => i > currentWordIndex && w.status === 'unknown'
    );

    if (remainingUnknown.length > 0) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // If we reached the end, check if there are any unknown words from the beginning
      const anyUnknown = flashcardWords.some(w => w.status === 'unknown');
      if (anyUnknown) {
        setCurrentWordIndex(0);
      } else {
        // All words are known
        initializeFlashcards(); // Reset for another round
      }
    }
  };

  if (!selectedGroupId) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Select a Group to Study</h2>
        <select
          value={selectedGroupId}
          onChange={(e) => {
            setSelectedGroupId(e.target.value);
            setCurrentWordIndex(0);
            if (e.target.value) {
              initializeFlashcards();
            }
          }}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (groupWords.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Add some words to this group to start learning!</p>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setCurrentWordIndex((prev) => (prev + 1) % groupWords.length);
    setUserAnswer('');
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setQuizType('multiple-choice')}
          className={`px-4 py-2 rounded-md ${
            quizType === 'multiple-choice'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Multiple Choice
        </button>
        <button
          onClick={() => setQuizType('spelling')}
          className={`px-4 py-2 rounded-md ${
            quizType === 'spelling'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Spelling
        </button>
        <button
          onClick={() => {
            setQuizType('flashcard');
            initializeFlashcards();
          }}
          className={`px-4 py-2 rounded-md ${
            quizType === 'flashcard'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Flashcards
        </button>
      </div>

      {quizType === 'flashcard' ? (
        <Flashcard
          word={flashcardWords[currentWordIndex]}
          onResponse={handleFlashcardResponse}
        />
      ) : (
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium text-center mb-4">
            {quizType === 'multiple-choice'
              ? 'Select the correct Chinese translation'
              : 'Spell the English word'}
          </h3>
          
          <p className="text-center text-2xl mb-8">
            {quizType === 'multiple-choice' ? currentWord.english : currentWord.chinese}
          </p>

          {quizType === 'multiple-choice' ? (
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`p-4 rounded-md border ${
                    showResult
                      ? option === currentWord.chinese
                        ? 'bg-green-100 border-green-500'
                        : option === userAnswer
                        ? 'bg-red-100 border-red-500'
                        : 'border-gray-200'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the English word"
                className="w-full p-2 border rounded-md"
                disabled={showResult}
              />
              {!showResult && (
                <button
                  onClick={() => handleAnswer(userAnswer)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Check Answer
                </button>
              )}
            </div>
          )}

          {showResult && (
            <div className="mt-6 text-center">
              <p className={`text-lg ${
                userAnswer.toLowerCase() === (
                  quizType === 'multiple-choice' 
                    ? currentWord.chinese 
                    : currentWord.english.toLowerCase()
                ) 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {userAnswer.toLowerCase() === (
                  quizType === 'multiple-choice'
                    ? currentWord.chinese
                    : currentWord.english.toLowerCase()
                )
                  ? 'Correct!'
                  : `Incorrect. The answer is ${
                      quizType === 'multiple-choice'
                        ? currentWord.chinese
                        : currentWord.english
                    }`}
              </p>
              <button
                onClick={nextQuestion}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}