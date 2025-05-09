import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <h1>Welcome to Pantry Manager!</h1>
      <p>Track your pantry ingredients and get recipe suggestions based on what you have.</p>
      <Link href="/pantry">
        Add to your Pantry
      </Link>
      <Link href="/recommend">
        Check Recommended Recipes
      </Link>
    </main>
  );
}
