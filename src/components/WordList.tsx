import React from 'react';
import { Trash2 } from 'lucide-react';
import { useWordStore } from '../store/words';

export function WordList() {
  const words = useWordStore((state) => state.words);
  const removeWord = useWordStore((state) => state.removeWord);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900">Vocabulary List</h2>
      <div className="mt-4 divide-y divide-gray-200">
        {words.map((word) => (
          <div
            key={word.id}
            className="flex items-center justify-between py-3"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{word.english}</p>
              <p className="text-sm text-gray-500">{word.chinese}</p>
            </div>
            <button
              onClick={() => removeWord(word.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}