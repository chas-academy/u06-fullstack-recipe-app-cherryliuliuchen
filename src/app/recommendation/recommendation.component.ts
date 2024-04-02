import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RecipeService } from '../recipe.service';
import { RecipeApiRespone } from '../recipe-api-response.interface';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import CommonModule and RouterModule
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data: RecipeApiRespone) => {
        if(data.hits && data.hits.length > 0) {
          // Process each recipe data to extract the ID and add it to the recipe object
          this.recipes = data.hits.map(hit => {
            // Extract recipe ID from URI
            const id = hit.recipe.uri.split('#recipe_')[1];
            // Add ID to recipe object
            return { ...hit.recipe, id };
          });
        }
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      }
    });
  }
}
