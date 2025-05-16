const axios = require('axios');

async function recommendRecipes(pantry) {
    // validate pantry
    if (!Array.isArray(pantry)) {
        throw new TypeError("Expected pantry to be an array")
    }

    // format pantry ingredients
    const pantryIngredients = pantry.map((item) => item.name.toLowerCase());
    const pantryIngredientsString = pantryIngredients.join(',');

    // fetch recipe data from spoonacular api
    let recipes = [];

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                ingredients: pantryIngredientsString,
                number: 100,
                ranking: 1,
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });

        recipes = response.data;
    } catch (err) {
        console.error('Error fetching recipes', err);
    }

    return recipes.map((recipe, index) => {
        // grab used + missing ingredients
        const usedIngredients = recipe.usedIngredients.map((ingredient) => 
            ingredient.name
        )
        const missedIngredients = recipe.missedIngredients.map((ingredient) =>
            ingredient.name
        )

        // calculate percentage of matching ingredients for recipe
        const matchScore = Math.round((recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100);

        return {
            id: recipe.id,
            title: recipe.title,
            imageUrl: recipe.image,
            usedIngredients: usedIngredients,
            match: matchScore,
            missing: missedIngredients
        };
    }).sort((a, b) => b.match - a.match);  // sort by match score in descending order
}

module.exports = recommendRecipes;