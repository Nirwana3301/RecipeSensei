import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs-compat';

export class ShoppingListService {
  //Manage ingredients
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Potatoes', 15),
    new Ingredient('Onions', 4),
  ];

  getIngredients() {
    //Return a copy of the array
    //We call slice() without any arguments to return a new array which is an exact copy of the one in this service file
    //because arrays and objects are reference types, so if we returned this array directly,
    //we would return a pointer to the original array
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); //... is the spread operator
    //Spread operaoor allows us to turn an array of elements into a list of elements
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
