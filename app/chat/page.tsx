"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ title: string; url: string; relevance: number }>;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: `⚖️ **Bienvenido a LegalTech UY**

Soy tu asistente legal especializado en derecho laboral uruguayor.

Puedo ayudarte con situaciones como:

• **Despidos** - Me echaron sin decirme nada, me deben plata, me pagaban en negro
• **Accidentes de trabajo** - Me injure en el trabajo, no me quieren reconocer
• **Acoso laboral** - Me hostigan en el trabajo
• **Contractos irregulares** - No me dieron contrato, me pagan por fuera
• **Horas extra** - Me hacen trabajar sin pagarme

**CONTAME TU CASO** - Ejemplo: "Trabaje 1 mes sin contrato y me dejaron en caja"

Te explico:
- Tus derechos
- El procedimiento legal
- Los plazos para actuar
- Donde tenes que ir

*Powered by Groq - consulta siempre a un abogado matriculado*`
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.message,
        sources: data.sources,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "⚠️ Disculpá, tuve un problema al procesar tu consulta. Por favor intentá de nuevo.\n\nError: " + (error as Error).message 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <span className="font-bold text-xl">LegalTech UY</span>
          </a>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">🟢 IA Activa</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-lg ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-opacity-20">
                      <p className="text-xs font-medium mb-2 opacity-70">Fuentes:</p>
                      <div className="space-y-1">
                        {message.sources.map((source, i) => (
                          <a key={i} href={source.url} target="_blank" 
                             className="block text-xs opacity-70 hover:underline">
                            • {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu consulta jurídica..."
                className="flex-1 h-12 px-4 rounded-md border bg-background"
                disabled={loading}
              />
              <Button type="submit" size="lg" disabled={loading || !input.trim()}>
                {loading ? "..." : "Enviar"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Groq API • Orientación legal, siempre consultá un abogado matriculado
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}