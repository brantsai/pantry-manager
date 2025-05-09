import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100 text-gray-900">
        <nav className="bg-black shadow p-4 flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/pantry">Pantry</Link>
          <Link href="/recommend">Recommendations</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
