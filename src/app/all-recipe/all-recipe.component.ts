import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { RecipeApiRespone } from '../recipe-api-response.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-recipe.component.html',
  styleUrls: ['./all-recipe.component.css']
})

// implements OnInit means that AllRecipeComponent class implemented the OnInit interface
export class AllRecipeComponent implements OnInit {
  recipes: any[] = [];
  message: string = '';
  //? means is is not required
  selectedDishType?: string;
  selectedHealthFilter?: string;
  selectedDietFilter?: string; // Add the diet filter

  // The constructor receives an instance of RecipeService through dependency injection (DI) mechanism
  //The component depends on RecipeService
  constructor(private recipeService: RecipeService) { }

  //Angular will automatically call it after the component is initialized.
  //Once the component is created and initialized, the recipe data is automatically loaded.
  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    // Update method call to include new diet filter 
    //Use getRecipes method in recipeService, there are 3 parameters in this function.
    // Use .subscribe method to handle asynchronously returned data or errors.
    this.recipeService.getRecipes(this.selectedDishType, this.selectedHealthFilter, this.selectedDietFilter).subscribe(data => {
      //Data hits > 0 means that we get the data from API
      if(data.hits && data.hits.length > 0) {
        //Use map method to iterate the data.hits array.
        this.recipes = data.hits.map(hit => {
          //Get the id
          const id = hit.recipe.uri.split('#recipe_')[1];
          //Combine the recipe and id, and create a new object. And give the value to recipes
          return { ...hit.recipe, id };
        });
        //Clear all the error message
        this.message = '';
      } else {
        //If no data, give the message as below
        this.recipes = [];
        this.message = 'Sorry, no recipes found.';
      }
    }, error => {
      //If have some error when send request to API, give the message as below.
      this.recipes = [];
      this.message = 'Error loading recipes. Please try again later.';
    });
  }
// Filter the recipes as user selected. 
  filterRecipes(filterType: 'dishType' | 'health' | 'diet', filterValue: string) {
    if (filterType === 'dishType') {
      this.selectedDishType = this.selectedDishType === filterValue ? undefined : filterValue;
    } else if (filterType === 'health') {
      this.selectedHealthFilter = this.selectedHealthFilter === filterValue ? undefined : filterValue;
    } else if (filterType === 'diet') { 
      this.selectedDietFilter = this.selectedDietFilter === filterValue ? undefined : filterValue;
    }
    this.loadRecipes();
  }

  isDishTypeDisabled(dishType: string): boolean {
    // return this.selectedDishType !== undefined && this.selectedDishType !== dishType;
    // If we have the selected dishtype, return ture.
    return this.selectedDishType !== undefined;
  }

  isHealthFilterDisabled(healthFilter: string): boolean {
    return this.selectedHealthFilter !== undefined && this.selectedHealthFilter !== healthFilter;
  }

  isDietFilterDisabled(dietFilter: string): boolean { // Check if we need to inactive the diet filter.
    return this.selectedDietFilter !== undefined && this.selectedDietFilter !== dietFilter;
  }

  resetFilters() {
    this.selectedDishType = undefined;
    this.selectedHealthFilter = undefined;
    this.selectedDietFilter = undefined; // Reset diet
    this.loadRecipes();
  }
}
