# LegalTech UY

Suite LegalTech de código abierto para Uruguay. Buscador jurídico con IA, asistente legal, redactor de documentos y más.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## Características

- 🔍 **Buscador Jurídico** - Búsqueda semántica de normativa y jurisprudencia Uruguaya
- ⚖️ **Asistente Legal IA** - Chat especializado en derecho uruguayo
- 📝 **Redactor de Documentos** - Generación de escritos, demandas y contratos
- ⏱️ **Calculadora de Plazos** - Plazos procesales automáticos (CPC, Código del Trabajo)
- 🎙️ **Transcripción** - Audio a texto de audiencias
- 📁 **Gestión de Casos** - CRM legal para estudios jurídicos

##Demo

Visitá [legaltech.uy](https://legaltech.uy) para ver la demo funcional.

## Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/legaltech-uy/legaltech-uy.git
cd legaltech-uy

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

## Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

## Stack

| Tecnología | Uso |
|------------|-----|
| Next.js 14 | Framework |
| TypeScript | Lenguaje |
| Tailwind CSS | Estilos |
| shadcn/ui | Componentes |
| Supabase | Base de datos + Auth |
| Groq | API de IA |

## Roadmap

- [x] Landing page
- [ ] Buscador jurídico
- [ ] Asistente IA
- [ ] Redactor de documentos
- [ ] Calculadora de plazos
- [ ] Transcripción
- [ ] CRM legal
- [ ] API pública

## Contributing

¡Toda contribución es bienvenida! Leé [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

## Licencia

MIT - see [LICENSE](LICENSE) para más detalles.

---

Hecho con ❤️ para la comunidad Uruguaya.