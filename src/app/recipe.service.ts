import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeApiRespone } from './recipe-api-response.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

getRecipes(dishType?: string, health?: string, diet?: string): Observable<RecipeApiRespone> {
  let queryParams = `type=public&app_id=${environment.edamamAppId}&app_key=${environment.edamamAppKey}&cuisineType=American`;
  
  if (dishType) {
    queryParams += `&dishType=${dishType}`;
  }
  if (health) {
    queryParams += `&health=${health}`;
  }
  if (diet) {
    queryParams += `&diet=${diet}`;
  }

  const url = `${environment.edamamApiUrl}?${queryParams}`;
  return this.http.get<RecipeApiRespone>(url);
}

  getRecipeById(id: string): Observable<any> {
    const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${environment.edamamAppId}&app_key=${environment.edamamAppKey}`;
    return this.http.get<any>(url);
  }
}