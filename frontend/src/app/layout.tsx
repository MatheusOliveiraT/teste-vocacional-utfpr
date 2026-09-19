import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teste Vocacional UTFPR — Câmpus Campo Mourão",
  description:
    "Descubra qual dos 10 cursos de graduação do câmpus de Campo Mourão combina mais com o seu perfil através de escolhas simples.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable}`}>
      <head>
        {/* Material Symbols usados nos ícones em todo o produto */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-surface-base font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        <Header />
        <main className="w-full flex-1 pt-16 bg-surface-base">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
