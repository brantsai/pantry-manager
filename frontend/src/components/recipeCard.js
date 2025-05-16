export default function RecipeCard({ recipe }) {
    return (
        <div className="border border-gray-300 p-4 rounded shadow mb-4 max-w-md">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold capitalize">{recipe.title}</h2>
            <p className="text-sm mt-1">
                Match: <span className="font-semibold">{recipe.match}%</span>
            </p>

            {recipe.missing.length > 0 && (
                <p className="text-sm text-green-500 mt-2">
                    Available ingredients: {recipe.usedIngredients.join(', ')}
                </p>
            )}

            {recipe.missing.length > 0 && (
                <p className="text-sm text-red-500 mt-2">
                    Missing: {recipe.missing.join(', ')}
                </p>
            )}
        </div>
    );
}