'use client';

import axios from 'axios';
import Link from 'next/link';
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
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-4">Recommended Recipes</h1>

            <div className="flex flex-col sm:flex-row justify-left gap-4 pt-4 mt-6">
                <Link href="/pantry" className="mb-6 px-6 py-3 rounded-lg bg-gray-400 text-white text-sm font-semibold hover:bg-gray-500 transition">
                    Back to Pantry
                </Link>
            </div>

            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe.id}/>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 mt-6">
                <Link href="/pantry" className="px-6 py-3 rounded-lg bg-gray-400 text-white text-sm font-semibold hover:bg-gray-500 transition">
                    Back to Pantry
                </Link>
            </div>
        </div>
    );
}
