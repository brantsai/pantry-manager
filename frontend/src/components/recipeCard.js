export default function RecipeCard({ recipe }) {
    return (
        <div className="border p-4 rounded shadow mb-4 max-w-md">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-sm text-gray-600">By {recipe.author}</p>
            <p className="text-sm">Prep Time: {recipe.prepTime} minutes</p>
            <p className="text-sm">Rating: ⭐ {recipe.rating}</p>
            <p className="text-sm mt-1">
                Match: <span className="font-semibold">{recipe.match}%</span>
            </p>

            {recipe.missing.length > 0 && (
                <p className="text-sm text-red-500 mt-2">
                    Missing: {recipe.missing.join(', ')}
                </p>
            )}
        </div>
    );
}