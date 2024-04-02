import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // Get recipe id from route parameter
    const recipeId = this.route.snapshot.paramMap.get('id');
    console.log(`Navigating to recipe with ID: ${recipeId}`);

    // Query recipe details using recipe ID
    if (recipeId) {
      this.recipeService.getRecipeById(recipeId).subscribe({
        next: (data) => {
          this.recipe = data.recipe;// From response
          console.log('Recipe data loaded', this.recipe);
        },
        error: (error) => console.error('Error fetching recipe details:', error)
      });
    }
  }
}
