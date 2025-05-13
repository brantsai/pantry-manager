import "./globals.css";
import Link from 'next/link';
import { PantryProvider } from "@/context/pantryContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="font-bold p-4 flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/pantry">Pantry</Link>
        </nav>
        <PantryProvider>
          {children}
        </PantryProvider>
      </body>
    </html>
  );
}
