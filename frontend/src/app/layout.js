import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
