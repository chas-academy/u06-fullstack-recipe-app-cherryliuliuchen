export interface RecipeApiRespone{
    from: number;
    to: number;
    count: number;
    _links: any;
    hits: Array<{
        recipe: {
            uri: string;
            label: string;
            image: string;
            images: {
                THUMBNAIL: { url: string; width: number; height: number; };
                SMALL: { url: string; width: number; height: number; };
                REGULAR: { url: string; width: number; height: number; };
                LARGE: { url: string; width: number; height: number; };
            };
            source: string;
            url: string;
            shareAs: string;
            yield: number;
            dietLabels: string[];
            healthLabels: string[];
            cautions: string[];
            ingredientLines: string[];
            ingredients: Array<{
                text: string;
                quantity: number;
                measure: string;
                food: string;
                weight: number;
                foodCategory: string;
                foodId: string;
                image: string;
            }>;
            calories: number;
            totalCO2Emissions: number;
            co2EmissionsClass: string;
            totalWeight: number;
            totalTime: number;
            cuisineType: string[];
            mealType: string[];
            dishType: string[];
            totalNutrients: any;
            totalDaily: any;
            digest: any[];
            tags: string[];
        };
        _links: {
            self: {
                href: string;
                title: string;
            };
        };
    }>;
}
