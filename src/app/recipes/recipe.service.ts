import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list-service';

@Injectable()
export class RecipeService {
  //Manange recipes
  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Pan Seared Salmon',
      'This meal is delicious and healthy',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [
        new Ingredient('Salmon', 1),
        new Ingredient('Lemon', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Pepper', 1),
      ]
    ),
    new Recipe(
      'Meatballs',
      'This meal is delicious and healthy',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Tomato', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Pepper', 1),
      ]
    ),
    new Recipe(
      'Pasta',
      'Italian pasta',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Tomato', 1),
        new Ingredient('Salt', 1),
      ]
    ),
    new Recipe(
      'Dumplings',
      'Chinese dumplings',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [
        new Ingredient('Pork', 1),
        new Ingredient('Flour', 1),
        new Ingredient('Salt', 1),
      ]
    ),
  ];

  getRecipes() {
    //Return a copy of the array
    //We call slice() without any arguments to return a new array which is an exact copy of the one in this service file
    //because arrays and objects are reference types, so if we returned this array directly,
    //we would return a pointer to the original array
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
