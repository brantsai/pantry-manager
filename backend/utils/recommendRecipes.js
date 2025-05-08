const recipes = require('../data/recipes.json');

function recommendRecipes(pantry) {
    // validate pantry
    if (!Array.isArray(pantry)) {
        throw new TypeError("Expected pantry to be an array")
    }

    return recipes.map((recipe, index) => {
        // validate ingredients
        if (!Array.isArray(recipe.ingredients)) {
            throw new TypeError(`Recipe at index ${index} is missing a valid 'ingredients' array`);
        }

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