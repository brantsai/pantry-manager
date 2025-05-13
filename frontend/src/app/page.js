import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Pantry Manager!</h1>
        <p className="text-lg text-gray-600">
          Track your pantry ingredients and get recipe suggestions based on what you have.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/pantry" className="px-6 py-3 rounded-lg bg-gray-400 text-white text-sm font-semibold hover:bg-gray-500 transition">
            Add to your Pantry
          </Link>
        </div>

      </div>
    </main>
  );
}
