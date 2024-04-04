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

  //Accept 3 parameters, send get request to edamam, it will return Observable object.
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
  // use get to get the data from url. Tell HttpClient that it should be match RecipeApiRespone structure.
  return this.http.get<RecipeApiRespone>(url);
}
//Accept a id for parameter. get the recipe by id, will return an Observable object.
  getRecipeById(id: string): Observable<any> {
    const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${environment.edamamAppId}&app_key=${environment.edamamAppKey}`;
    return this.http.get<any>(url);
  }
}