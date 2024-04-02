import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RouterModule, Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  // Specifies the HTML tag that Angular uses to instantiate this component. 
  selector: 'app-root',
  // allowing it to be imported directly into other components or modules without the need for an Angular module.
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    HeaderComponent,
    FooterComponent,
    RecommendationComponent,
    RecipeDetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tastetime';
  showRecommendation = true;

}
