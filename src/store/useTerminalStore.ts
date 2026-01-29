import { create } from 'zustand';

interface TerminalState {
  isOpen: boolean;
  history: string[];
  currentInput: string;
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
  addHistory: (entry: string) => void;
  clearHistory: () => void;
  setCurrentInput: (input: string) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  isOpen: false,
  history: ['Welcome to the hidden terminal of Haerul Yuda Aditiya.', 'Type "help" to see available commands.'],
  currentInput: '',
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  addHistory: (entry) => set((state) => ({ history: [...state.history, entry] })),
  clearHistory: () => set({ history: [] }),
  setCurrentInput: (input) => set({ currentInput: input }),
}));
