import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AllRecipeComponent } from './all-recipe/all-recipe.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

//Configure the path
export const routes: Routes = [
  // { path: '', component: RecommendationComponent, pathMatch: 'full' },
  // { path: 'allrecipe', component: AllRecipeComponent },
  { path: '', component: AllRecipeComponent, pathMatch: 'full' },
  { path: 'recomendation', component: RecommendationComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'login', component: UserComponent },
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
