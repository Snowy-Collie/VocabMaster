import React, { useState } from 'react';
import { FileUp } from 'lucide-react';
import { useWordStore } from '../store/words';
import { parseBatchWords } from '../utils/wordParser';

interface BatchImportProps {
  selectedGroupId: string;
}

export function BatchImport({ selectedGroupId }: BatchImportProps) {
  const [text, setText] = useState('');
  const addWords = useWordStore((state) => state.addWords);

  const handleImport = () => {
    if (!selectedGroupId) {
      alert('Please select a group first');
      return;
    }
    const words = parseBatchWords(text);
    addWords(words, selectedGroupId);
    setText('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Batch Import</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Enter words in format:&#10;English, Chinese&#10;Example:&#10;Radiation, 辐射&#10;Salinity, 盐度"
      />
      <button
        onClick={handleImport}
        disabled={!text.trim() || !selectedGroupId}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        <FileUp className="mr-2 h-4 w-4" />
        Import Words
      </button>
    </div>
  );
}