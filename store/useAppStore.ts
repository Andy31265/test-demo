import { create } from 'zustand';

interface AppState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  favorites: [],
  addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter(fav => fav !== id) })),
  isFavorite: (id) => get().favorites.includes(id)
}));