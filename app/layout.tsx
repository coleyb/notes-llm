import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "../components/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Notes LLM",
  description: "A note taking app for LLM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
