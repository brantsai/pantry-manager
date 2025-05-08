const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const recommendRecipes = require('./utils/recommendRecipes')

app.use(cors());
app.use(express.json());

/**
 * ROUTES
 */


/**
 * POST /recommend
 * Accepts an array of pantry items and returns a sorted
 * array of recipes with match percentage and missing 
 * ingredients using recommendRecipe function.
 */
app.post('/recommend', (req, res) => {
    try {
        const pantryItems = req.body.pantry;

        if (!Array.isArray(pantryItems)) {
            return res.status(400).json({ error: "Missing or invalid pantry array" })
        }

        const recommendedRecipes = recommendRecipes(pantryItems);
        res.status(200).json(recommendedRecipes);
    }
    catch (err) {
        console.error('Error in /recommend', err);
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});