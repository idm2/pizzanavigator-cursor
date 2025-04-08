import toppingsData from '@/data/toppings-data.json';

export interface ToppingIngredient {
  name: string;
  amount: string;
  unit: string;
}

// Keeping this interface for backwards compatibility with any code that might use it
export interface ToppingMethod {
  id: string;
  title: string;
  description: string;
}

export interface ToppingRecipe {
  id: string;
  name: string;
  tags: string[];
  ingredients: ToppingIngredient[];
  method: string[]; // Changed from ToppingMethod[] to string[]
}

// Get all topping recipes
export const getAllToppingRecipes = (): ToppingRecipe[] => {
  return toppingsData.toppingRecipes;
};

// Get all topping categories
export const getAllToppingCategories = (): string[] => {
  return toppingsData.toppingCategories;
};

// Get a topping recipe by ID
export const getToppingRecipeById = (id: string): ToppingRecipe | undefined => {
  return toppingsData.toppingRecipes.find(recipe => recipe.id === id);
};

// Get a topping recipe by name
export const getToppingRecipeByName = (name: string): ToppingRecipe | undefined => {
  return toppingsData.toppingRecipes.find(
    recipe => recipe.name.toLowerCase() === name.toLowerCase()
  );
};

// Get topping recipes by category
export const getToppingRecipesByCategory = (category: string): ToppingRecipe[] => {
  return toppingsData.toppingRecipes.filter(recipe => 
    recipe.tags.includes(category)
  );
};

// Format the ingredients for display
export const formatToppingIngredient = (ingredient: ToppingIngredient): string => {
  if (!ingredient.amount && !ingredient.unit) {
    return ingredient.name;
  }
  
  if (!ingredient.unit) {
    return `${ingredient.amount} ${ingredient.name}`;
  }
  
  return `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
};

// Remove duplicate toppings from an array
export const removeDuplicateToppings = (toppings: string[]): string[] => {
  return [...new Set(toppings)];
}; 