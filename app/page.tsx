"use client";

import { useState, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput("");
    setLoading(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Tuve un problema al procesar tu consulta. Intentá de nuevo." 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur border rounded-lg p-4 shadow-lg mt-6">
      <div className="flex flex-col h-[400px]">
        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
          {messages.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              <p className="mb-2">⚖️ Escribí tu consulta legal:</p>
              <p className="text-xs">"Me quedaron debiendo 2 meses desalario"</p>
              <p className="text-xs">"Trabaje sin contrato y me echaron"</p>
              <p className="text-xs">"Tuve un accidente en el trabajo"</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-2 rounded-lg max-w-[90%] ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  {msg.content.slice(0, 1000)}{msg.content.length > 1000 ? "..." : ""}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="text-left">
              <div className="bg-muted p-2 rounded-lg inline-flex">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu caso..."
            className="flex-1 h-10 px-3 rounded-md border bg-background text-sm"
            disabled={loading}
          />
          <Button type="submit" size="sm" disabled={loading || !input.trim()}>
            {loading ? "..." : "Enviar"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <span className="font-bold text-xl">LegalTech UY</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium hover:text-primary">
              Buscador
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-primary">
              Asistente IA
            </Link>
            <a href="https://github.com/doble243/legaltech-uy" target="_blank" className="text-sm font-medium hover:text-primary">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Tecnología Legal
              <span className="text-primary"> Abierta</span> para Uruguay
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Tu asistente legal con IA. Preguntá sobre despidos, accidentes, contratos.
              <span className="block mt-2 text-sm">Gratis y open source.</span>
            </p>
            
            {/* Chat directo en el hero */}
            <HeroChat />
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  Ver más
                </Button>
              </Link>
              <a href="https://github.com/doble243/legaltech-uy" target="_blank">
                <Button variant="ghost" size="sm">
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Puedo ayudarte con
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <FeatureCard
              icon="💼"
              title="Despidos"
              description="Me quedaron debiendo, me echaron sin motivo, no me pagaban"
            />
            <FeatureCard
              icon="🏥"
              title="Accidentes"
              description="Me injure en el trabajo, no me quieren reconocer"
            />
            <FeatureCard
              icon="📄"
              title="Contratos"
              description="No me dieron contrato, me pagan en negro"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>100% Open Source • MIT License</p>
          <a href="https://github.com/doble243/legaltech-uy" className="hover:underline">
            github.com/doble243/legaltech-uy
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-4 bg-card border rounded-lg text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}