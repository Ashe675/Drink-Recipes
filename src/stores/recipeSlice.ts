import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe } from "../types"
import { SearchFilter } from '../types/index';
import { FavoritesSliceType } from "./favoriteSlice";

export type RecipesSliceType = {
    categories : Categories
    drinks : Drinks
    selectedRecipe : Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter : SearchFilter) => Promise<void>
    selectRecipe: (id : Drink['idDrink']) => Promise<void>
    closeModal : () => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks : []
    },
    drinks : {
        drinks : []
    },
    selectedRecipe : {} as Recipe,
    modal: false,
    fetchCategories: async () =>  {
        const categories = await getCategories()
        if(categories){
            set(()=>({
                categories
            }))
        }
    },
    searchRecipes : async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe : async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal : true
        })
    },
    closeModal : () => {
        set({
            modal : false,
            selectedRecipe : {} as Recipe
        })
    }
})