const express = require('express');
const cors = require('cors');
const db = require('./db/pool')
const app = express();
const PORT = 5000;

const recommendRecipes = require('./utils/recommendRecipes')

app.use(cors());
app.use(express.json());

/**
 * ROUTES
 */


/**
 * POST /recommend: Recommend recipes
 * Accepts an array of pantry items and returns a sorted
 * array of recipes with match percentage and missing 
 * ingredients using recommendRecipe function.
 */
app.post('/recommend', (req, res) => {
    const pantryIngredients = req.body.pantry;

    // validate pantry array
    if (!Array.isArray(pantryIngredients)) {
        return res.status(400).json({ error: "Missing or invalid pantry array" })
    }

    try {
        const recommendedRecipes = recommendRecipes(pantryIngredients);
        res.status(200).json(recommendedRecipes);
    }
    catch (err) {
        console.error('Error in /recommend', err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


/**
 * POST /pantry: Add pantry ingredient
 * Accepts a single pantry ingredient and adds it to
 * the pantry DB.
 */
app.post('/pantry', async (req, res) => {
    const pantryIngredient = req.body

    // validate pantry ingredient
    if (!pantryIngredient) {
        return res.status(400).json({ error: "Missing pantry ingredient 'name' in request body" });
    }

    const name = pantryIngredient.name.toLowerCase().trim();  // trim and lowercase ingredient name
    
    try {
        const text = `
            INSERT INTO pantry.ingredients(name) 
            VALUES($1)
            RETURNING *;
        `;
        values = [name];

        const result = await db.query(text, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding ingredient to pantry', err);

        // special case for unique constraint violation
        if (err.code === '23505') {
            return res.status(409).json({ error: "Ingredient already exists" });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
});


/**
 * GET /pantry: Get all pantry ingredients
 * Grabs all pantry ingredients from pantry DB and 
 * returns it in an array.
 */
app.get('/pantry', async (req, res) => {
    try {
        const text = `
            SELECT id, name FROM pantry.ingredients ORDER BY id ASC;
        `;

        const result = await db.query(text);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error getting pantry ingredients', err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


/**
 * DELETE /pantry: Delete a pantry ingredient
 * Takes in a pantry ingredient ID and deletes the
 * corresponding ingredient from pantry DB.
 */
app.delete('/pantry/:id', async (req, res) => {
    // validate id
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }


    try {
        const text = `
            DELETE FROM pantry.ingredients
            WHERE id = $1;
        `;
        const values = [id];

        const result = await db.query(text, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Ingredient not found" });
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting pantry ingredient', err);
        res.status(500).json({error: "Internal server error" });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});