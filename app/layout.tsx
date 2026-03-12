import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../src/app/globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Web Roulette",
  description: "Discover a perfectly pointless corner of the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
