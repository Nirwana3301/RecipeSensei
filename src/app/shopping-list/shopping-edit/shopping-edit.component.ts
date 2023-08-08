import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list-service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    const ingName = form.value

    const newIngredient = new Ingredient(ingName.name, ingName.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
