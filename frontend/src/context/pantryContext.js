'use client';

import { createContext, useContext, useState } from "react";

const PantryContext = createContext();

export function PantryProvider({ children }) {
    const [pantryItems, setPantryItems] = useState([]);

    return (
        <PantryContext.Provider value={{ pantryItems, setPantryItems }}>
            {children}
        </PantryContext.Provider>
    );
}

export function usePantry() {
    return useContext(PantryContext)
}