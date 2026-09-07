/**
 * Capa de acceso a datos.
 * - Modo LOCAL: devuelve window.LOCAL_DATA.
 * - Modo SUPABASE: consulta las tablas vía REST (PostgREST) usando fetch, sin dependencias externas.
 *
 * Estructura esperada de tablas Supabase (ver /supabase/schema.sql):
 *   staff(id, nombre, employee_id, is_contractor, rol, seniority, is_lider, skills jsonb)
 *   proyectos(id, nombre, tipo, inicio, fin, recursos jsonb)
 *   mantenimientos(id, nombre, tipo, fin, lider, hs)
 */
(function () {
  const cfg = window.APP_CONFIG || {};

  async function sbFetch(path) {
    const url = `${cfg.SUPABASE_URL}/rest/v1/${path}`;
    const res = await fetch(url, {
      headers: {
        apikey: cfg.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${cfg.SUPABASE_ANON_KEY}`,
        Accept: "application/json"
      }
    });
    if (!res.ok) throw new Error(`Supabase ${path}: ${res.status}`);
    return res.json();
  }

  // Mapea filas Supabase (snake_case) al formato interno usado por render.
  const mapStaff = (rows) =>
    rows.map((r) => ({
      n: r.nombre,
      id: r.employee_id,
      c: !!r.is_contractor,
      rol: r.rol,
      sen: r.seniority,
      lider: !!r.is_lider,
      sk: r.skills || {}
    }));

  const mapProy = (rows) =>
    rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      tipo: r.tipo,
      inicio: r.inicio,
      fin: r.fin,
      recursos: r.recursos || []
    }));

  const mapMant = (rows) =>
    rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      tipo: r.tipo,
      fin: r.fin,
      lider: r.lider,
      hs: r.hs
    }));

  window.DataSource = {
    async load() {
      if (cfg.USE_SUPABASE) {
        try {
          const [staff, proy, mant] = await Promise.all([
            sbFetch("staff?select=*"),
            sbFetch("proyectos?select=*"),
            sbFetch("mantenimientos?select=*")
          ]);
          document.getElementById("dataSource").textContent = "supabase";
          return {
            skillCols: window.LOCAL_DATA.skillCols,
            staff: mapStaff(staff),
            proyectos: mapProy(proy),
            mantenimientos: mapMant(mant)
          };
        } catch (err) {
          console.warn("Supabase falló, usando datos locales:", err);
          document.getElementById("dataSource").textContent = "local (fallback)";
        }
      } else {
        document.getElementById("dataSource").textContent = "local";
      }
      return window.LOCAL_DATA;
    }
  };
})();
