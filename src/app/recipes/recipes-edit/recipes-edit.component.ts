import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validator,
  FormArray,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css'],
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  @ViewChild('addIngredient') addIngredient: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }

  ngAfterViewInit() {
    this.moveAddIngredientButtonIfUserHoversOverIngredientButton();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    //Add a new ingredient to the ingredients FormArray
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    //Remove an ingredient from the ingredients FormArray
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  moveAddIngredientButtonIfUserHoversOverIngredientButton() {
    //If the user hovers over the add ingredient button, move the button to the right
    //so that the user can see what they are typing in the ingredient input field
    //and the add ingredient button at the same time.
    this.addIngredient.nativeElement.addEventListener('mouseover', () => {
      this.addIngredient.nativeElement.style.position = 'fixed';
      this.addIngredient.nativeElement.style.marginLeft = '200px';
      this.addIngredient.nativeElement.style.cursor = 'default';

    });

    //If the user moves the mouse away from the add ingredient button, move the button
    //back to its original position.
    this.addIngredient.nativeElement.addEventListener('mouseout', () => {
      this.addIngredient.nativeElement.style.position = 'relative';
      this.addIngredient.nativeElement.style.marginLeft = '0px';
    });
  }
}
