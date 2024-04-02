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
export class AllRecipeComponent implements OnInit {
  recipes: any[] = [];
  message: string = '';
  selectedDishType?: string;
  selectedHealthFilter?: string;
  selectedDietFilter?: string; // Add the diet filter

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    // Update method call to include new diet filter 
    this.recipeService.getRecipes(this.selectedDishType, this.selectedHealthFilter, this.selectedDietFilter).subscribe(data => {
      if(data.hits && data.hits.length > 0) {
        this.recipes = data.hits.map(hit => {
          const id = hit.recipe.uri.split('#recipe_')[1];
          return { ...hit.recipe, id };
        });
        this.message = '';
      } else {
        this.recipes = [];
        this.message = 'Sorry, no recipes found.';
      }
    }, error => {
      this.recipes = [];
      this.message = 'Error loading recipes. Please try again later.';
    });
  }

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
    return this.selectedDishType !== undefined && this.selectedDishType !== dishType;
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
