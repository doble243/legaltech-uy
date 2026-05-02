import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { LEGAL_INFO, getDespido, getPlazo } from "@/lib/legal-data";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const BASE_INFO = `
📋 INFORMACIÓN LEGAL ACTUALIZADA - Uruguay Mayo 2025

💰 SALARIO:
- Salario Mínimo Nacional: $23.604/mes
- Unidad Reajustable: ~$1.619

⏰ PLAZOS LEGALES:
- Demandar despido: 30 días (Código del Trabajo)
- Reclamar créditos: 2 años (Ley 18.091)
- Denunciar accidente: 48 horas (Ley 16.074)

🏛️ ORGANISMOS:
- MTSS: www.mtss.gub.uy (denuncias laborales)
- BPS: www.bps.gub.uy (jubilaciones)
- Poder Judicial: www.poderjudicial.gub.uy
- Defensa Pública: www.defensapublica.gub.uy (abogado gratis)
`;

// 13 tipos de despido para referencia rápida
const DESPIDO_TYPES = `
💼 TIPOS DE DESPIDO (actualizado 2025):

1. COMÚN: Sin causa, 1 mes x año (máx 6 meses)
2. INDIRECTO: Por incumplimiento del empleador
3. ABUSIVO: Con daños extraordinarios, IPD + 2-6 meses
4. SINDICAL: Ley 17.940, reinstalación preferida
5. DURANTE LICENCIA: Doble indemnización
6. ACCIDENTE TRABAJO: Triple IPD (Ley 16.074)
7. ACOSO SEXUAL: IPD + 6 meses (Ley 18.561)
8. EMBARAZO: IPD + 6 meses (Ley 11.577)
9. REPRESENTANTES: Triple IPD + multas
10. DENUNCIA BPS: Triple + multas
11. VIOLENCIA GÉNERO: IPD + 6 meses (Ley 19.580)
12. DISCAPACIDAD: IPD + 6 mensualidades (Ley 19.691)
13. PERÍODO PRUEBA: Sin indemnización (máx 90 días con contrato)
`;

const SYSTEM_PROMPT = `Eres LegalTech UY - Asistente legal de Uruguay.

📌 REGLAS OBLIGATORIAS:

1. RESPUESTAS ESTRUCTURADAS siempre:

## 📋 RESUMEN
(2-3 líneas con lo más importante)

## ⚠️ TUS DERECHOS
- Lista concreta de derechos
- Usar bullet points

## 📌 PASOS A SEGUIR
1. Primer paso
2. Segundo paso
3. Tercer paso

## 🏛️ DÓNDE IR
- Organismo + link o dirección

## 📄 DOCUMENTACIÓN
- Lista de documentos

## ⏰ PLAZO
(Plazo legal si aplica, muy importante!)

## 💰 INDEMNIZACIÓN
(Cálculo si corresponde)

## ⚠️ IMPORTANTE
(Advertencias, avocat(e) necesario, etc.)

2. Usa la INFORMACIÓN LEGAL ACTUALIZADA que tienes en contexto:
- Salario mínimo: $23.604
- Plazo demanda: 30 días
- Prescripción: 2 años (Ley 18.091)
- 13 tipos de despido con indemnizaciones específicas

3. Para casos de DESPIDO, siempre indica:
- El tipo específico de despido
- La indemnización que corresponde
- El plazo exacto (30 días para demandas)
- Si aplica double o triple indemnización

4. CITA NORMAS ESPECÍFICAS:
- Leyes: 10.570, 16.074, 18.561, 17.940, 18.091, 19.580, 19.581, 19.691, 20.130, 20.312, 20.396
- Artículos cuando conozcas

5. Si no sabes algo, admítelo y sugiere dónde buscar

6. Tono: CLARO, EMPÁTICO, DIRECTO

ÁREAS: Laboral, Familia, Consumidor, Civil, Penal, Admin

EJEMPLO de respuesta correcta:

## 📋 RESUMEN
Sufriste un DESPIDO INJUSTIFICADO (=_COMÚN) con 2 meses de salarioadeudado. Puedes demandar en el Juzgado Letrado.

## ⚠️ TUS DERECHOS
- Salario caído (2 meses + intereses)
- Indemnización por despido común (1 mes × años trabajados)
- Licencia y aguinaldo proporcionales

## 📌 PASOS A SEGUIR
1. Reunir documentación (recibos, constancia laboral)
2. Presentar denuncia en MTSS (www.mtss.gub.uy)
3. Demandar en Juzgado Letrado dentro de 30 días

## 🏛️ DÓNDE IR
- Ministerio de Trabajo: www.mtss.gub.uy
- Juzgado Letrado de tu zona

## 📄 DOCUMENTACIÓN
- Constancia laboral
- Recibos de pago
- Cualquier prueba del vínculo

## ⏰ PLAZO
30 días desde el despido (CRÍTICO)

## 💰 INDEMNIZACIÓN
~1 mes de salario por cada año trabajado (máx 6 meses)

## ⚠️ IMPORTANTE
Consultá un abogado laboralista. Muchos trabajan en contingencia.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Construir contexto con info legal
    const context = `${BASE_INFO}\n\n${DESPIDO_TYPES}`;
    
    // Agregar info de despido si es relevante
    let extraInfo = "";
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes("despido") || msgLower.includes("despedir") || msgLower.includes("echar")) {
      if (msgLower.includes("acoso")) {
        const d = getDespido("acoso sexual");
        if (d) extraInfo = `\n\n📌 CASO ESPECÍFICO:\n${d.tipo}: ${d.calculo}\nNormativa: ${d.normativa}`;
      } else if (msgLower.includes("accidente") || msgLower.includes("trabajo")) {
        const d = getDespido("accidente");
        if (d) extraInfo = `\n\n📌 CASO ESPECÍFICO:\n${d.tipo}: ${d.calculo}\nNormativa: ${d.normativa}`;
      } else if (msgLower.includes("embaraz") || msgLower.includes("embarazo")) {
        const d = getDespido("embarazo");
        if (d) extraInfo = `\n\n📌 CASO ESPECÍFICO:\n${d.tipo}: ${d.calculo}\nNormativa: ${d.normativa}`;
      } else if (msgLower.includes("sindicat") || msgLower.includes("delegado")) {
        const d = getDespido("sindical");
        if (d) extraInfo = `\n\n📌 CASO ESPECÍFICO:\n${d.tipo}: ${d.calculo}\nNormativa: ${d.normativa}`;
      }
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context}${extraInfo}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: fullPrompt },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2048,
    });

    const response = chatCompletion.choices[0]?.message?.content || "Disculpa, no pude generar una respuesta. Intentá de nuevo.";

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}