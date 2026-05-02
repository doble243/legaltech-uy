import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            <Link href="https://github.com" target="_blank" className="text-sm font-medium hover:text-primary">
              GitHub
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Link href="/auth">Ingresar</Link>
            </Button>
            <Button size="sm">
              <Link href="/auth">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Tecnología Legal
              <span className="text-primary"> Abierta</span> para Uruguay
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Suite LegalTech 100% open source. Buscador jurídico, asistente IA, 
              redactor de documentos y más. Gratis para la comunidad.
            </p>
            
            {/* Demo Search Bar */}
            <div className="bg-card border rounded-lg p-4 shadow-lg">
              <form action="/search" method="GET" className="flex gap-2">
                <input
                  type="text"
                  name="q"
                  placeholder="Buscar legislación, jurisprudencia, fallos..."
                  className="flex-1 h-12 px-4 rounded-md border bg-background"
                  defaultValue=""
                />
                <Button type="submit" size="lg">
                  Buscar
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Ejemplo: "despido injustificado", "régimen de visitas", "contrato de alquiler"
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/search">
                <Button variant="outline" size="lg">
                  Probar Buscador
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg">
                  Hablar con Asistente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Todo lo que necesitás en una plataforma
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🔍"
              title="Buscador Inteligente"
              description="Normativa y jurisprudencia Uruguaya con búsqueda semántica IA"
            />
            <FeatureCard
              icon="⚖️"
              title="Asistente Legal IA"
              description="Chat especializado en derecho uruguayo, disponible 24/7"
            />
            <FeatureCard
              icon="📝"
              title="Redactor de Documentos"
              description="Generación de escritos, demandas y contratos con IA"
            />
            <FeatureCard
              icon="⏱️"
              title="Calculadora de Plazos"
              description="Plazos procesales automáticos según CPC y Código del Trabajo"
            />
            <FeatureCard
              icon="🎙️"
              title="Transcripción"
              description="Audio a texto de audiencias con speaker diarization"
            />
            <FeatureCard
              icon="📁"
              title="Gestión de Casos"
              description="CRM legal con IA para Studies jurídicos"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <Stat number="15K+" label="Sentencias" />
            <Stat number="5K+" label="Leyes y Decretos" />
            <Stat number="50K+" label="Usuarios" />
            <Stat number="100%" label="Open Source" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Unite a la comunidad
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Ayudanos a construir la tecnología legal del futuro para Uruguay. 
            Código abierto, colaboración comunitaria.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="https://github.com" target="_blank">
              <Button variant="secondary" size="lg">
                Ver en GitHub
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Comenzar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">LT</span>
              </div>
              <span className="font-medium">LegalTech UY</span>
            </div>
            <p className="text-sm text-muted-foreground">
              100% Open Source • MIT License
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com" className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-card border rounded-lg">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}