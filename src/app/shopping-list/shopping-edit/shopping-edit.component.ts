import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list-service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  //Reactive Forms for name and amount
  ingredientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit() {
    //Subscribe to the startedEditing Subject
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editItemIndex = index;
      this.editMode = true;

      //Get the ingredient to be edited
      this.editedItem = this.shoppingListService.getIngredient(index);

      //Set the form values
      this.ingredientForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  //Add ingredient
  onAddIngredient() {
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const newIngredient = new Ingredient(name, amount);
 
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy() {
    this.shoppingListService.startedEditing.unsubscribe();
  }
}
