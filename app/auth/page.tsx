import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Ingresar | LegalTech UY",
  description: "Ingresa o regístrate en LegalTech UY",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold">LT</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Bienvenido a LegalTech UY</h1>
          <p className="text-muted-foreground mt-2">
            Suite Legal Open Source para Uruguay
          </p>
        </div>

        <div className="space-y-4">
          <Button className="w-full" size="lg">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.24-1.05-.84-1.05-.84-.84-.605-2.115-.735-2.115-.735-1.425-.975.105-.975.105-.975 1.575.15 2.4.995 2.4.995.81 1.395 2.13 1.395 2.13 1.095 1.875 2.865 1.335 3.56 1.02.105-.795.42-1.335.765-1.635-2.715-.3-5.565-1.365-5.565-6.075 0-1.335.48-2.43 1.265-3.285-.135-.3-.555-1.53.12-3.24 0 0 1.035-.33 3.375 1.26.99-.27 2.04-.405 3.09-.405s2.1.135 3.09.405c2.34-1.59 3.375-1.26 3.375-1.26.675 1.71.255 2.94.12 3.24.785.855 1.265 1.95 1.265 3.285 0 4.725-2.865 5.775-5.595 6.075.435.375.84 1.125.84 2.265 0 1.635-.015 2.955-.015 3.36 0 .315.225.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continuar con GitHub
          </Button>
          
          <Button variant="outline" className="w-full" size="lg">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.96 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.96 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </Button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">o</span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="w-full h-10 px-3 rounded-md border bg-background mt-1"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Enviar link de acceso
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Al registrarte aceptás nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}