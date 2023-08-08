import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list-service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  //Reactive Forms for name and amount
  ingredientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  //Add ingredient
  onAddIngredient() {
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
