// src/app/layout.tsx
<<<<<<< HEAD
import './globals.css'
import type { Metadata } from 'next'
import { geistSans, geistMono } from '@/lib/fonts'
import { ClientProviders } from '@/providers/ClientProviders'
import { AppSidebar } from '@/components/ui/sidebar/AppSidebar'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Flowjuyu | Cortes Marketplace',
  description: 'Compra directo al productor',
}
=======
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientProviders from "@/providers/ClientProviders";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flowjuyu Marketplace",
  description: "Compra directo a artesanos guatemaltecos",
};
>>>>>>> 40fdc55 (Mergeo frontend)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ClientProviders>
          <AppSidebar />
          <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow h-16">
            <Header />
          </header>
          <main className="pt-16 min-h-screen">
            {children}
          </main>
=======
    <html lang="es" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ClientProviders>
          {/* Provee contexto a cualquier SidebarTrigger del Header sin pintar sidebar global */}
          <SidebarProvider>
            <div className="flex min-h-screen w-full flex-col">
              {/* Header a ancho completo */}
              <Header />

              {/* Main con contenedor centralizado real (clase propia) */}
              <main className="flex-1 w-full">
                <div className="app-container">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
>>>>>>> 40fdc55 (Mergeo frontend)
        </ClientProviders>
      </body>
    </html>
  )
}
