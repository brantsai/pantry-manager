'use client';

import axios from 'axios';
import { usePantry } from "@/context/pantryContext";
import { useState, useEffect } from "react";
import RecipeCard from '@/components/recipeCard';

export default function RecommendPage() {
    const { pantryItems } = usePantry();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecommend = async () => {
            try {
                const response = await axios.post('api/recommend', pantryItems);
                setRecipes(response.data);
            } catch (err) {
                console.error('Failed to fetch recipes/recommend', err);
            }
        }

        fetchRecommend();
    }, [pantryItems]);


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Recommended Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <RecipeCard recipe={recipe}/>
                ))}
            </div>
        </div>
    );
}
