import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegalTech UY | Suite Legal Open Source para Uruguay",
  description: "Suite LegalTech 100% open source para abogados, escribanos y ciudadanos de Uruguay. Buscador jurídico, asistente IA, redactor de documentos y más.",
  keywords: ["legaltech", "uruguay", "ia legal", "abogados", "jurisprudencia", "buscador juridico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}