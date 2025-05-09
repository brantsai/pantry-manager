'use client';

import axios from "axios";
import { useState, useEffect } from "react";


export default function PantryPage() {
    const [pantryItems, setPantryItems] = useState([]);
    const [newItem, setNewItem] = useState('')

    useEffect(() => {
        const fetchPantryItems = async () => {
            try {
                const response = await axios.get('/api/pantry');
                setPantryItems(response.data);
            } catch (err) {
                console.error('Failed to fetch pantry items:', err);
            }
        };

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

    return (
        <div className="p-4">
            <h1>My Pantry</h1>
            <form onSubmit={handleAdd}>
                <input 
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add an ingredient"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {pantryItems.map((item) => (
                    <li key={item.id}>
                        {item.name}
                        <button className="text-red-500">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
