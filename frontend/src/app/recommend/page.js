'use client';

import axios from 'axios';
import { usePantry } from "@/context/pantryContext";
import { useState, useEffect } from "react";

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
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        {recipe.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
