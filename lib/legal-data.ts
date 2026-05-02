// LegalTech UY - Cache de Información Legal Actualizada
// Actualización: Mayo 2025

export const LEGAL_INFO = {
  lastUpdate: "2025-05-02",
  
  // Normativas vigentes 2024-2025
  normas: {
    salarial: {
      salarioMinimoNacional: 23604,
      unidadReajustable: 1619, //Valor aproximado 2025
      fuente: "MTSS",
      url: "https://www.mtss.gub.uy"
    },
    jubilacion: {
      edadJubilacion: 65,
      ley: "Ley 20.130",
      url: "https://www.bps.gub.uy"
    },
    licenciaPaternal: {
      dias: 17, // 20 desde Ene 2026
      ley: "Ley 20.312"
    }
  },

  // Tipos de despido y indemnizaciones
  despidos: [
    {
      tipo: "Común",
      descripcion: "Sin causa justificada, el empleador paga indemnización",
      calculo: "1 mes de salary por cada año trabajado (máx 6 meses)",
      normativa: "Ley 10.570",
      plazo: "30 días desde el despido",
      prescripcion: "2 años (Ley 18.091)",
      adicional: "Salario caido + licencia + aguinaldo"
    },
    {
      tipo: "Indirecto",
      descripcion: "Empleador incumple (no paga, condiciones insalubres) y el trabajador renuncia",
      calculo: "Indemnización por despido común",
      normativa: "Jurisprudencia TAT",
      plazo: "30 días desde el incumplimiento"
    },
    {
      tipo: "Abusivo",
      descripcion: "Con daños extraordinarios por arbitrariedad del empleador",
      calculo: "IPD + 2 a 6 meses adicionales",
      normativa: "Jurisprudencia TAT",
      ejemplo: "Discriminación, represalia"
    },
    {
      tipo: "Por actividad sindical",
      descripcion: "Despido de delegado sindical",
      calculo: "IPD + adicional fijada por tribunal",
      normativa: "Ley 17.940",
      derecho: "Reinstalación preferida"
    },
    {
      tipo: "Durante licencia médica",
      descripcion: "Despido durante o 30 días después de licencia médica",
      calculo: "Indemnización doble",
      normativa: "Decreto Ley 14.407"
    },
    {
      tipo: "Por accidente de trabajo",
      descripcion: "Despido durante ausencia por accidente laboral",
      calculo: "Triple IPD + salarios caídos",
      normativa: "Ley 16.074 Art. 69",
      plazo: "180 días post-reintegro"
    },
    {
      tipo: "Por acoso sexual",
      descripcion: "Despido por denuncia de acoso",
      calculo: "IPD + 6 meses adicionales mínimo",
      normativa: "Ley 18.561"
    },
    {
      tipo: "Por embarazo",
      descripcion: "Despido de trabajadora embarazada",
      calculo: "IPD + 6 meses adicionales",
      normativa: "Ley 11.577",
      plazo: "180 días post-reintegro"
    },
    {
      tipo: "Por representación de trabajadores",
      descripcion: "Despido de integrantes de negociación colectiva",
      calculo: "Triple IPD + multas 50-500 UR",
      normativa: "Ley 16.713"
    },
    {
      tipo: "Por denuncia al BPS",
      descripcion: "Despido tras denunciar irregularidades en historia laboral",
      calculo: "Triple IPD + multas",
      plazo: "180 días post-denuncia"
    },
    {
      tipo: "Por violencia de género",
      descripcion: "Despido de víctima con medidas de protección",
      calculo: "IPD + 6 meses adicionales",
      normativa: "Ley 19.580"
    },
    {
      tipo: "De trabajador con discapacidad",
      descripcion: "Despido injustificado de trabajador con discapacidad",
      calculo: "IPD + 6 mensualidades adicionales",
      normativa: "Ley 19.691"
    },
    {
      tipo: "En período de prueba",
      descripcion: "Hasta 90 días sin contrato escrito",
      calculo: "Sin indemnización",
      nota: "Debe estar pactado por escrito"
    }
  ],

  // Plazos legales importantes
  plazos: [
    { accion: "Demandar despido", plazo: "30 días", norma: "Código del Trabajo" },
    { accion: "Reclamar créditos laborales", plazo: "2 años", norma: "Ley 18.091" },
    { accion: "Reclamar horas extras", plazo: "2 años", norma: "Ley 18.091" },
    { accion: "Denunciar accidente", plazo: "48 horas", norma: "Ley 16.074" },
    { accion: "Registrar platform worker", plazo: "30 días", norma: "Ley 20.396" }
  ],

  // Links útiles
  organismos: [
    { nombre: "Ministerio de Trabajo", abrev: "MTSS", url: "https://www.mtss.gub.uy", tipo: "Denuncias laborales" },
    { nombre: "Banco de Previsión Social", abrev: "BPS", url: "https://www.bps.gub.uy", tipo: "Jubilaciones" },
    { nombre: "Poder Judicial", abrev: "PJ", url: "https://www.poderjudicial.gub.uy", tipo: "Consultas de causas" },
    { nombre: "Defensa Pública", abrev: "DP", url: "https://www.defensapublica.gub.uy", tipo: "Abogado gratuito" },
    { nombre: "Instituto de Estadística", abrev: "INE", url: "https://www.ine.gub.uy", tipo: "Datos laborales" },
    { nombre: "Ministerio de Salud Pública", abrev: "MSP", url: "https://www.msp.gub.uy", tipo: "Salud laboral" }
  ],

  // Áreas legales adicionales para el prompt
  areas: {
    laboral: {
      temas: ["Despidos", "Accidentes", "Acoso", "Salario", "Contratos", "Licencias", "Jornada"],
      normativa: "Ley 10.570, Ley 16.074, Ley 18.561, Ley 17.940"
    },
    familia: {
      temas: ["Divorcio", "Tenencia", "Pensión", "Violencia doméstica", "Violencia género"],
      normativa: "Ley 19.580, Ley 19.581"
    },
    consumidor: {
      temas: ["Garantías", "Estafa", "Deudas", "Defensa del consumidor"],
      normativa: "Ley 17.250"
    },
    civil: {
      temas: ["Alquileres", "Contratos", "Herencias", "Responsabilidad civil"],
      normativa: "Código Civil"
    },
    penal: {
      temas: ["Denuncias", "Defensa penal"],
      normativa: "Código Penal"
    },
    admin: {
      temas: ["Jubilaciones", "Pensiones", "Permisos", "Recursos"],
      normativa: "Ley 20.130, BPS"
    }
  }
};

// Función helper para buscar info
export function buscarInfoLegal(area: string, tema: string): any {
  const areaData = LEGAL_INFO.areas[area.toLowerCase() as keyof typeof LEGAL_INFO.areas];
  if (!areaData) return null;
  
  if (tema) {
    const temas = areaData.temas.map(t => t.toLowerCase());
    const idx = temas.findIndex(t => t.includes(tema.toLowerCase()));
    if (idx >= 0) return areaData.temas[idx];
  }
  
  return areaData;
}

export function getPlazo(accion: string): string {
  const found = LEGAL_INFO.plazos.find(p => 
    p.accion.toLowerCase().includes(accion.toLowerCase())
  );
  return found ? `${found.plazo} (${found.norma})` : "Consultar con abogado";
}

export function getDespido(tipo: string): any {
  const found = LEGAL_INFO.despidos.find(d => 
    d.tipo.toLowerCase().includes(tipo.toLowerCase()) ||
    d.descripcion.toLowerCase().includes(tipo.toLowerCase())
  );
  return found || null;
}