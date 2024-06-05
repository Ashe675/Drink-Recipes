import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from './favoriteSlice';
import { NotificationSliceType, createNotificatonSlice } from "./notificationSlice";

// trabajando con Slice Pattern
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificatonSlice(...a)
})))