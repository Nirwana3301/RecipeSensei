import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  //Manange recipes
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pan Seared Salmon',
      'This meal is delicious and healthy',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'
    ),
    new Recipe(
      'Meatballs',
      'This meal is delicious and healthy',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'
    ),
    new Recipe(
      'Pasta',
      'Italian pasta',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'
    ),
    new Recipe(
      'Dumplings',
      'Chinese dumplings',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'
    ),
  ];

  getRecipes() {
    //Return a copy of the array
    //We call slice() without any arguments to return a new array which is an exact copy of the one in this service file
    //because arrays and objects are reference types, so if we returned this array directly,
    //we would return a pointer to the original array
    return this.recipes.slice();
  }
}
