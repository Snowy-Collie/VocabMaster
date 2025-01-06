import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Word, Group } from '../types';

interface WordStore {
  words: Word[];
  groups: Group[];
  addWord: (english: string, chinese: string, groupId: string) => void;
  addWords: (wordPairs: { english: string; chinese: string }[], groupId: string) => void;
  removeWord: (id: string) => void;
  addGroup: (name: string) => void;
  removeGroup: (id: string) => void;
}

export const useWordStore = create<WordStore>()(
  persist(
    (set) => ({
      words: [],
      groups: [],
      addWord: (english: string, chinese: string, groupId: string) =>
        set((state) => ({
          words: [
            ...state.words,
            {
              id: crypto.randomUUID(),
              english,
              chinese,
              groupId,
              createdAt: new Date(),
            },
          ],
        })),
      addWords: (wordPairs, groupId) =>
        set((state) => ({
          words: [
            ...state.words,
            ...wordPairs.map((pair) => ({
              id: crypto.randomUUID(),
              english: pair.english,
              chinese: pair.chinese,
              groupId,
              createdAt: new Date(),
            })),
          ],
        })),
      removeWord: (id: string) =>
        set((state) => ({
          words: state.words.filter((word) => word.id !== id),
        })),
      addGroup: (name: string) =>
        set((state) => ({
          groups: [
            ...state.groups,
            {
              id: crypto.randomUUID(),
              name,
              createdAt: new Date(),
            },
          ],
        })),
      removeGroup: (id: string) =>
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
          words: state.words.filter((word) => word.groupId !== id),
        })),
    }),
    {
      name: 'vocabulary-storage',
    }
  )
);