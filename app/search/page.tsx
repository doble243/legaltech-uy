"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";

const demoResults = {
  normativa: [
    {
      id: "ley-18284",
      titulo: "Ley N° 18.284 - Código del Proceso Penal",
      tipo: "ley",
      numero: "18284",
      anno: 2007,
      origen: "Poder Legislativo",
      url: "https://www.impo.com.uy/b/CODIGO-DEL-PROCESO-PENAL",
      contenido: "El presente Código establece las normas procesales aplicables a los delitos...",
      relevancia: 0.95
    },
    {
      id: "ley-19100",
      titulo: "Ley N° 19.100 - Ley de Arrendamientos y Okupación",
      tipo: "ley",
      numero: "19100",
      anno: 2013,
      origen: "Poder Legislativo",
      url: "https://www.impo.com.uy/b/ley-19100",
      contenido: "Las relaciones contractuales de arrendamiento se regirán por las disposiciones de esta ley...",
      relevancia: 0.88
    },
    {
      id: "decreto-54-2020",
      titulo: "Decreto N° 54/020 - Regulamentación de Emergencia Sanitaria",
      tipo: "decreto",
      numero: "54/020",
      anno: 2020,
      origen: "Poder Ejecutivo",
      url: "https://www.impo.com.uy/b/decreto-54-2020",
      contenido: "Establécense las siguientes medidas preventivas en materia de salud pública...",
      relevancia: 0.82
    }
  ],
  jurisprudencia: [
    {
      id: "scj-7-2023",
      titulo: "SCJ 7/2023 - Responsabilidad por daño moral en accidentes de tránsito",
      tribunal: "Suprema Corte de Justicia",
      fecha: "2023-03-15",
      tipo: "sentencia",
      materia: "Responsabilidad Civil",
      contenido: "En supuestos de daño moral derivado de accidentes de tránsito, la indemnización debe ser proporcionada...",
      url: "https://www.poderjudicial.gub.uy",
      relevancia: 0.91
    },
    {
      id: "ta-capital-45-2022",
      titulo: "TA Capital 45/2022 - Despido injustificado en período de prueba",
      tribunal: "Tribunal de Apelaciones",
      fecha: "2022-11-20",
      tipo: "sentencia",
      materia: "Derecho Laboral",
      contenido: "El período de prueba no puede invocarse para justificar un despido sin causa...",
      url: "https://www.poderjudicial.gub.uy",
      relevancia: 0.87
    },
    {
      id: "jl-natal-12-2023",
      titulo: "Juzgado Letrado Natal 12/2023 - Régimen de visitas",
      tribunal: "Juzgado Letrado de Familia",
      fecha: "2023-06-10",
      tipo: "sentencia",
      materia: "Derecho de Familia",
      contenido: "El derecho de visitas del progenitor no conviviente debe ejercerse de manera efectiva...",
      url: "https://www.poderjudicial.gub.uy",
      relevancia: 0.84
    }
  ]
};

function filterResults(query: string, type: string) {
  if (!query || query.length < 3) {
    return { normativa: [], jurisprudencia: [] };
  }
  
  const q = query.toLowerCase();
  return {
    normativa: type === "jurisprudencia" ? [] : demoResults.normativa.filter(item => 
      item.titulo.toLowerCase().includes(q) || 
      item.contenido.toLowerCase().includes(q)
    ),
    jurisprudencia: type === "normativa" ? [] : demoResults.jurisprudencia.filter(item =>
      item.titulo.toLowerCase().includes(q) ||
      item.contenido.toLowerCase().includes(q)
    )
  };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";
  
  const results = filterResults(query, type);

  return (
    <>
      <form action="/search" method="GET" className="flex gap-2 mb-6">
        <input
          type="text"
          name="q"
          placeholder="Buscar legislação, jurisprudencia..."
          className="flex-1 h-12 px-4 rounded-md border bg-background"
          defaultValue={query}
          autoFocus
        />
        <button type="submit" className="px-6 h-12 bg-primary text-white font-medium rounded-md hover:bg-primary/90">
          Buscar
        </button>
      </form>
      
      <div className="flex gap-2 mb-6">
        <Link href="/search?type=all" className={`px-3 py-1 rounded-full text-sm ${type === 'all' ? 'bg-primary text-white' : 'bg-muted'}`}>Todo</Link>
        <Link href="/search?type=normativa" className={`px-3 py-1 rounded-full text-sm ${type === 'normativa' ? 'bg-primary text-white' : 'bg-muted'}`}>Normativa</Link>
        <Link href="/search?type=jurisprudencia" className={`px-3 py-1 rounded-full text-sm ${type === 'jurisprudencia' ? 'bg-primary text-white' : 'bg-muted'}`}>Jurisprudencia</Link>
      </div>

      {query.length < 3 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ingresá al menos 3 caracteres para buscar</p>
        </div>
      ) : (
        <div className="space-y-8">
          {results.normativa.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Normativa ({results.normativa.length})</h2>
              <div className="space-y-4">
                {results.normativa.map((item: any) => (
                  <a key={item.id} href={item.url} target="_blank" className="block p-4 border rounded-lg hover:bg-muted/50">
                    <h3 className="font-medium">{item.titulo}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.contenido.slice(0, 150)}...</p>
                    <p className="text-xs text-muted-foreground mt-2">{item.tipo.toUpperCase()} • {item.origen} • {Math.round(item.relevancia * 100)}%</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          
          {results.jurisprudencia.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Jurisprudencia ({results.jurisprudencia.length})</h2>
              <div className="space-y-4">
                {results.jurisprudencia.map((item: any) => (
                  <a key={item.id} href={item.url} target="_blank" className="block p-4 border rounded-lg hover:bg-muted/50">
                    <h3 className="font-medium">{item.titulo}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.contenido.slice(0, 150)}...</p>
                    <p className="text-xs text-muted-foreground mt-2">{item.tribunal} • {item.materia} • {item.fecha}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          
          {results.normativa.length === 0 && results.jurisprudencia.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron resultados para "{query}"</p>
              <p className="text-sm text-muted-foreground mt-2">Probá con términos más genéricos o buscalo en el asistente IA</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <span className="font-bold text-xl">LegalTech UY</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium text-primary">Buscador</Link>
            <Link href="/chat" className="text-sm font-medium hover:text-primary">Asistente IA</Link>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Suspense fallback={<div className="text-center py-12">Cargando...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </div>
  );
}