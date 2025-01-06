import React, { useState } from 'react';
import { PlusCircle, FolderPlus } from 'lucide-react';
import { useWordStore } from '../store/words';
import { BatchImport } from './BatchImport';

export function WordForm() {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  
  const { addWord, groups, addGroup } = useWordStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (english.trim() && chinese.trim() && selectedGroupId) {
      addWord(english.trim(), chinese.trim(), selectedGroupId);
      setEnglish('');
      setChinese('');
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      addGroup(newGroupName.trim());
      setNewGroupName('');
      setShowNewGroupInput(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="group" className="block text-sm font-medium text-gray-700">
            Select Group
          </label>
          <div className="mt-1 flex gap-2">
            <select
              id="group"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewGroupInput(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FolderPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showNewGroupInput && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="New group name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleCreateGroup}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create
            </button>
          </div>
        )}

        <div>
          <label htmlFor="english" className="block text-sm font-medium text-gray-700">
            English Word
          </label>
          <input
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter English word"
          />
        </div>
        <div>
          <label htmlFor="chinese" className="block text-sm font-medium text-gray-700">
            Chinese Translation
          </label>
          <input
            type="text"
            id="chinese"
            value={chinese}
            onChange={(e) => setChinese(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="输入中文翻译"
          />
        </div>
        <button
          type="submit"
          disabled={!selectedGroupId}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Word
        </button>
      </form>

      <div className="border-t pt-6">
        <BatchImport selectedGroupId={selectedGroupId} />
      </div>
    </div>
  );
}