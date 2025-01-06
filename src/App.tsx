import React from 'react';
import { Book, Plus } from 'lucide-react';
import { WordForm } from './components/WordForm';
import { WordList } from './components/WordList';
import { Quiz } from './components/Quiz';

function App() {
  const [activeTab, setActiveTab] = React.useState<'add' | 'learn'>('add');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Book className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  VocabMaster
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('add')}
            className={`inline-flex items-center px-4 py-2 rounded-md ${
              activeTab === 'add'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Words
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`inline-flex items-center px-4 py-2 rounded-md ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Book className="mr-2 h-4 w-4" />
            Learn
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'add' ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Add New Words
              </h1>
              <WordForm />
              <WordList />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Practice Words
              </h1>
              <Quiz />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;