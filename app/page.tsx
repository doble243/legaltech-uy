"use client";

import { useState, useRef, useEffect } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendQuery(query: string) {
    if (!query.trim() || loading) return;
    
    const userMessage: Message = { role: "user", content: query };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setMobileMenuOpen(false);
    
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
        content: "⚠️ Tuve un problema. Intentá de nuevo." 
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-xs md:text-sm">LT</span>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight">LegalTech UY</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Buscador
            </Link>
            <Link href="/chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Asistente IA
            </Link>
            <a href="https://github.com/doble243/legaltech-uy" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-3 space-y-2">
              <Link href="/search" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                🔍 Buscador
              </Link>
              <Link href="/chat" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                💬 Asistente IA
              </Link>
              <a href="https://github.com/doble243/legaltech-uy" target="_blank" className="block py-2 text-sm font-medium">
                🐙 GitHub
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container px-3 md:px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-4 md:mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              100% Gratis y Open Source
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
              Tu asistente legal con
              <span className="text-primary"> IA</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
              Consultá sobre despidos, violencia, deudas, divorcios y más. 
              Respuestas estructuradas con pasos concretos.
            </p>

            {/* Quick query buttons - responsive grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 md:mb-6">
              <QuickButton onClick={() => sendQuery("Me despidieron sin causa")} icon="💼" label="Despido" />
              <QuickButton onClick={() => sendQuery("Mi pareja me golpea")} icon="🏠" label="Violencia" />
              <QuickButton onClick={() => sendQuery("No me pagan el salario")} icon="💸" label="Salario" />
              <QuickButton onClick={() => sendQuery("Me accidenté en el trabajo")} icon="🏥" label="Accidente" />
              <QuickButton onClick={() => sendQuery("Quiero divorciarme")} icon="💔" label="Divorcio" className="col-span-2 md:col-span-1" />
            </div>
            
            {/* Chat Container - responsive */}
            <div className="bg-card border rounded-xl md:rounded-2xl shadow-xl shadow-primary/5 overflow-hidden mt-4 md:mt-6">
              <div className="bg-muted/30 px-3 md:px-4 py-2 md:py-3 border-b flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground font-medium">LegalTech UY</span>
              </div>
              
              <div className="flex flex-col h-[280px] md:h-[350px] lg:h-[400px]">
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
                  {messages.length === 0 ? (
                    <EmptyState />
                  ) : (
                    messages.map((msg, i) => (
                      <MessageBubble key={i} message={msg} />
                    ))
                  )}
                  {loading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t bg-background/50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describí tu caso..."
                      className="flex-1 h-11 md:h-12 px-3 md:px-4 rounded-lg md:rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      disabled={loading}
                    />
                    <Button type="submit" size="lg" className="rounded-lg md:rounded-xl px-4 md:px-6" disabled={loading || !input.trim()}>
                      {loading ? "..." : "Enviar"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6">
              <Link href="/chat">
                <Button variant="outline" size="sm" className="rounded-full text-xs md:text-sm">
                  Chat completo
                </Button>
              </Link>
              <a href="https://github.com/doble243/legaltech-uy" target="_blank">
                <Button variant="ghost" size="sm" className="rounded-full text-xs md:text-sm">
                  Ver código
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-14 bg-muted/20">
        <div className="container px-3 md:px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
            Áreas de derecho
          </h2>
          <p className="text-center text-muted-foreground mb-6 md:mb-8 text-sm">
            Seleccioná el área que corresponde a tu situación
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
            <FeatureCard icon="💼" title="Laboral" description="Despidos, accidentes" />
            <FeatureCard icon="👨‍👩‍👧" title="Familia" description="Divorcio, tenencia" />
            <FeatureCard icon="🛒" title="Consumidor" description="Garantías, deudas" />
            <FeatureCard icon="🏠" title="Civil" description="Alquileres" />
            <FeatureCard icon="⚖️" title="Penal" description="Denuncias" />
            <FeatureCard icon="🏛️" title="Admin" description="Jubilaciones" />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-10 md:py-14">
        <div className="container px-3 md:px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
            Recursos útiles
          </h2>
          <p className="text-center text-muted-foreground mb-6 md:mb-8 text-sm">
            Organismos oficiales y servicios de apoyo
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            <ResourceLink href="https://www.mtss.gub.uy" title="Ministerio de Trabajo" description="Denuncias laborales" />
            <ResourceLink href="https://www.bps.gub.uy" title="BPS" description="Jubilaciones" />
            <ResourceLink href="https://www.poderjudicial.gub.uy" title="Poder Judicial" description="Consultas" />
            <ResourceLink href="https://www.defensapublica.gub.uy" title="Defensa Pública" description="Abogado gratis" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 border-t bg-muted/10">
        <div className="container px-4 text-center">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
            LegalTech UY • 100% Open Source • MIT License
          </p>
          <a href="https://github.com/doble243/legaltech-uy" className="text-xs md:text-sm text-primary hover:underline">
            github.com/doble243/legaltech-uy
          </a>
        </div>
      </footer>
    </div>
  );
}

function QuickButton({ onClick, icon, label, className = "" }: { onClick: () => void; icon: string; label: string; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2.5 md:py-2 rounded-lg md:rounded-full border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-xs md:text-sm font-medium min-h-[44px] ${className}`}
    >
      <span className="text-sm md:text-base">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-6 md:py-8">
      <div className="text-3xl md:text-4xl mb-3">⚖️</div>
      <p className="text-muted-foreground mb-1 text-sm">Describí tu situación legal</p>
      <p className="text-xs text-muted-foreground/60">Ej: "Me deben 2 meses de salario"</p>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl rounded-br-md max-w-[85%] text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  // Parse structured response
  const lines = message.content.split('\n');
  const sections: Record<string, string[]> = {
    RESUMEN: [],
    DERECHOS: [],
    PASOS: [],
    DONDE: [],
    DOCUMENTACION: [],
    PLAZO: [],
    IMPORTANTE: [],
  };
  let currentSection = '';
  
  lines.forEach(line => {
    if (line.match(/^##\s*📋\s*RESUMEN/i)) {
      currentSection = 'RESUMEN';
    } else if (line.match(/^##\s*⚠️\s*DERECHOS/i)) {
      currentSection = 'DERECHOS';
    } else if (line.match(/^##\s*📌\s*PASOS/i)) {
      currentSection = 'PASOS';
    } else if (line.match(/^##\s*🏛️\s*DONDE/i)) {
      currentSection = 'DONDE';
    } else if (line.match(/^##\s*📄\s*DOCUMENT/i)) {
      currentSection = 'DOCUMENTACION';
    } else if (line.match(/^##\s*⏰\s*PLAZO/i)) {
      currentSection = 'PLAZO';
    } else if (line.match(/^##\s*💰\s*CUANTO/i)) {
      currentSection = 'MONTO';
    } else if (line.match(/^##\s*⚠️\s*IMPORTANTE/i)) {
      currentSection = 'IMPORTANTE';
    } else if (line.trim() && currentSection) {
      if (currentSection === 'RESUMEN') {
        sections.RESUMEN.push(line);
      } else if (line.match(/^[-*•]\s*/)) {
        sections[currentSection].push(line.replace(/^[-*•]\s*/, ''));
      } else {
        sections[currentSection].push(line);
      }
    }
  });

  return (
    <div className="bg-muted/50 rounded-xl md:rounded-2xl rounded-bl-md p-3 md:p-4 max-w-[95%] text-sm">
      {sections.RESUMEN.length > 0 && (
        <div className="mb-3 pb-2 border-b">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Resumen</h4>
          <p className="text-muted-foreground">{sections.RESUMEN.join(' ')}</p>
        </div>
      )}
      
      {sections.DERECHOS.length > 0 && (
        <div className="mb-2">
          <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Tus derechos</h4>
          <ul className="space-y-0.5">
            {sections.DERECHOS.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {sections.PASOS.length > 0 && (
        <div className="mb-2">
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Pasos a seguir</h4>
          <ol className="space-y-0.5 list-decimal list-inside">
            {sections.PASOS.map((item, i) => (
              <li key={i} className="pl-1">{item}</li>
            ))}
          </ol>
        </div>
      )}
      
      {sections.DONDE.length > 0 && (
        <div className="mb-2">
          <h4 className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Dónde ir</h4>
          <p className="text-muted-foreground">{sections.DONDE.join(' ')}</p>
        </div>
      )}
      
      {sections.DOCUMENTACION.length > 0 && (
        <div className="mb-2">
          <h4 className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Documentación</h4>
          <ul className="space-y-0.5">
            {sections.DOCUMENTACION.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-orange-500">📄</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {sections.PLAZO.length > 0 && (
        <div className="mb-2 p-2 bg-red-50 rounded-lg">
          <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-0.5">Plazo</h4>
          <p className="text-red-700 font-medium text-sm">{sections.PLAZO.join(' ')}</p>
        </div>
      )}
      
      {sections.IMPORTANTE.length > 0 && (
        <div className="mt-2 p-2.5 md:p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Importante</h4>
          <p className="text-amber-800 text-xs">{sections.IMPORTANTE.join(' ')}</p>
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted/50 px-4 py-3 rounded-xl md:rounded-2xl rounded-bl-md">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-3 md:p-4 lg:p-5 bg-card border rounded-lg md:rounded-xl text-center hover:shadow-md hover:border-primary/50 transition-all duration-200 min-h-[80px] md:min-h-[90px]">
      <div className="text-xl md:text-2xl mb-1 md:mb-2">{icon}</div>
      <h3 className="font-semibold text-sm md:text-base text-foreground">{title}</h3>
      <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function ResourceLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className="block p-3 md:p-4 bg-card border rounded-lg md:rounded-xl hover:shadow-md hover:border-primary/50 transition-all duration-200 min-h-[70px]">
      <h3 className="font-semibold text-sm md:text-base text-foreground">{title}</h3>
      <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
    </a>
  );
}