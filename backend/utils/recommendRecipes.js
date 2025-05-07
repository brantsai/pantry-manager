const recipes = require('../data/recipes.json');

function recommendRecipes(pantry) {
    return recipes.map((recipe) => {
        // find missing ingredients from pantry for recipe
        const missing = recipe.ingredients.filter((ingredient) => 
            !pantry.includes(ingredient.toLowerCase())
        );

        // calculate percentage of matching ingredients for recipe
        const matchScore = Math.round((recipe.ingredients.length - missing.length) / recipe.ingredients.length * 100);

        // add match and missing properties to recipe object
        return {
            ...recipe,
            match: matchScore,
            missing
        };
    }).sort((a, b) => b.match - a.match);  // sort by match score in descending order
}

module.exports = recommendRecipes;