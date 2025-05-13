'use client';

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePantry } from "@/context/pantryContext";


export default function PantryPage() {
    const { pantryItems, setPantryItems } = usePantry();
    const [newItem, setNewItem] = useState('')

    useEffect(() => {
        // create inner function to use async
        const fetchPantryItems = async () => {
            try {
                const response = await axios.get('/api/pantry');
                setPantryItems(response.data);
            } catch (err) {
                console.error('Failed to fetch pantry items:', err);
            }
        }

        fetchPantryItems();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        const trimmed = newItem.trim();
        if (!trimmed) return;

        try {
            const response = await axios.post('/api/pantry', {
                name: trimmed
            });

            // update pantry items list
            setPantryItems((prev) => [...prev, response.data]);

            // clear form input
            setNewItem('');
        } catch (err) {
            console.error('Failed to add pantry item:', err);
        }
    }

    const handleDelete = async (id) => {
        const confirm = window.confirm('Delete item?');
        if (!confirm) return;

        try {
            const response = await axios.delete(`/api/pantry/${id}`);

            // update pantry items list
            setPantryItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error('Failed to delete pantry item:', err);
        }
    }

    return (
        <div className="p-6 max-w-3x1 mx-auto">
            <h1 className="text-2xl font-semibold mb-4">My Pantry</h1>

            <form onSubmit={handleAdd} className="flex gap-3 mb-6">
                <input 
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add an ingredient"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gray-400 text-white text-sm font-semibold hover:bg-gray-500 transition"
                >
                    Add
                </button>
            </form>

            {pantryItems.length === 0 ? (
                <p className="text-gray-500">Your pantry is empty. Add some ingredients!</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                    {pantryItems.map((item) => (
                        <li 
                            key={item.id}
                            className="p-4 rounded-lg shadow flex justify-between items-center border border-gray-300"
                        >
                            <span className="capitalize">{item.name}</span>
                            <button 
                                className="text-sm text-red-600 hover:underline"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 mt-6">
                <Link href="/recommend" className="px-6 py-3 rounded-lg bg-gray-400 text-white text-sm font-semibold hover:bg-gray-500 transition">
                    Check Recommended Recipes
                </Link>
            </div>
        </div>
    );
}
