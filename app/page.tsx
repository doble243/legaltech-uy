"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendQuery(query: string) {
    if (!query.trim() || loading) return;
    
    const userMessage: Message = { role: "user", content: query };
    setMessages(prev => [...prev, userMessage]);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendQuery(input);
  }

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
              Tu asistente legal con IA. 6 áreas de derecho.
              <span className="block mt-2 text-sm">Gratis y open source.</span>
            </p>
            
            {/* Quick query buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Button variant="outline" size="sm" onClick={() => sendQuery("Me despidieron sin causa")}>
                💼 Despido
              </Button>
              <Button variant="outline" size="sm" onClick={() => sendQuery("Mi pareja me golpea")}>
                🏠 Violencia
              </Button>
              <Button variant="outline" size="sm" onClick={() => sendQuery("No me pagan el salario")}>
                💸 Salario
              </Button>
              <Button variant="outline" size="sm" onClick={() => sendQuery("Me accidenté en el trabajo")}>
                🏥 Accidente
              </Button>
              <Button variant="outline" size="sm" onClick={() => sendQuery("Quiero divorciarme")}>
                💔 Divorcio
              </Button>
            </div>
            
            {/* Chat */}
            <div className="bg-card/50 backdrop-blur border rounded-lg p-4 shadow-lg mt-4">
              <div className="flex flex-col h-[350px]">
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      <p className="mb-2">⚖️ Escribí tu consulta legal:</p>
                      <p className="text-xs">"Me quedaron debiendo 2 meses"</p>
                      <p className="text-xs">"Mi landlord me quiere echAR"</p>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className={`text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        <div className={`inline-block p-2 rounded-lg max-w-[90%] ${
                          msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          {msg.content.slice(0, 1200)}{msg.content.length > 1200 ? "..." : ""}
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
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  Chat completo
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
            Áreas de derecho disponibles
          </h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <FeatureCard
              icon="💼"
              title="Laboral"
              description="Despidos, accidentes, acoso, salaries"
            />
            <FeatureCard
              icon="👨‍👩‍👧"
              title="Familia"
              description="Divorcio, tenencia, pension"
            />
            <FeatureCard
              icon="🛒"
              title="Consumidor"
              description="Garantias, fraude, deudas"
            />
            <FeatureCard
              icon="🏠"
              title="Civil"
              description="Alquileres, contratos, herencias"
            />
            <FeatureCard
              icon="⚖️"
              title="Penal"
              description="Denuncias, defensa"
            />
            <FeatureCard
              icon="🏛️"
              title="Admin"
              description="Jubilaciones, permisos"
            />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Recursos útiles
          </h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <ResourceLink
              href="https://www.mtss.gub.uy"
              title="Ministerio de Trabajo"
              description="Denuncias laborales"
            />
            <ResourceLink
              href="https://www.bps.gub.uy"
              title="BPS"
              description="Jubilaciones y pensiones"
            />
            <ResourceLink
              href="https://www.poderjudicial.gub.uy"
              title="Poder Judicial"
              description="Consultas de causas"
            />
            <ResourceLink
              href="https://www.defensapublica.gub.uy"
              title="Defensa Pública"
              description="Abogado gratuito"
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

function ResourceLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className="block p-3 bg-card border rounded-lg hover:border-primary transition-colors">
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </a>
  );
}