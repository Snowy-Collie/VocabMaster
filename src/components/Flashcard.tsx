import React, { useState } from 'react';
import { FlashcardWord } from '../types';

interface FlashcardProps {
  word: FlashcardWord;
  onResponse: (known: boolean) => void;
}

export function Flashcard({ word, onResponse }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setShowButtons(true);
    }
  };

  const handleResponse = (known: boolean) => {
    onResponse(known);
    setIsFlipped(false);
    setShowButtons(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        onClick={handleClick}
        className={`w-full max-w-md aspect-[3/2] perspective-1000 cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
          <div
            className={`absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6 backface-hidden transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            <p className="text-3xl font-medium text-gray-900">{word.chinese}</p>
          </div>
          <div
            className={`absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6 backface-hidden transform rotate-y-180 ${
              isFlipped ? 'rotate-y-0' : ''
            }`}
          >
            <p className="text-3xl font-medium text-gray-900" style={{ transform: "scaleX(-1)", display: "inline-block" }}>{word.english}</p>
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="flex space-x-4 w-full max-w-md">
          <button
            onClick={() => handleResponse(false)}
            className="flex-1 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Don't Know
          </button>
          <button
            onClick={() => handleResponse(true)}
            className="flex-1 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Know
          </button>
        </div>
      )}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
}