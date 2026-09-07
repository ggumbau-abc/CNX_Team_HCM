/**
 * Configuración de la aplicación.
 * Para usar Supabase, edite estas variables o defina window.__ENV antes de cargar este script.
 *
 * Modo LOCAL (default): usa los datos hardcodeados en js/data.js (funciona sin backend).
 * Modo SUPABASE: si SUPABASE_URL y SUPABASE_ANON_KEY están definidos, la app leerá desde Supabase.
 */
window.APP_CONFIG = {
  SUPABASE_URL: (window.__ENV && window.__ENV.SUPABASE_URL) || "",
  SUPABASE_ANON_KEY: (window.__ENV && window.__ENV.SUPABASE_ANON_KEY) || "",
  USE_SUPABASE: false,  // se activa automáticamente si ambos valores arriba están presentes
  TITLE_HEADER: "Concentrix · Seguimiento de Capacidades & Proyectos · Julio 2026"
};
window.APP_CONFIG.USE_SUPABASE =
  Boolean(window.APP_CONFIG.SUPABASE_URL) && Boolean(window.APP_CONFIG.SUPABASE_ANON_KEY);
