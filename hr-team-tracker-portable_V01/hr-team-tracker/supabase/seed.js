/**
 * Seed script: sube los datos locales (js/data.js) a Supabase.
 *
 * Uso:
 *   export SUPABASE_URL="https://xxxxx.supabase.co"
 *   export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."   # service role para poder escribir
 *   node supabase/seed.js
 *
 * Requiere Node 18+ (usa fetch nativo).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) {
  console.error("Faltan SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// Cargamos data.js "a mano" (asigna window.LOCAL_DATA)
const dataPath = path.join(__dirname, "..", "js", "data.js");
const src = fs.readFileSync(dataPath, "utf8");
const window = {};
new Function("window", src)(window);
const data = window.LOCAL_DATA;

async function upsert(table, rows) {
  const res = await fetch(`${URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify(rows)
  });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  const out = await res.json();
  console.log(`✓ ${table}: ${out.length} filas`);
}

const staffRows = data.staff.map((s) => ({
  nombre: s.n,
  employee_id: s.id,
  is_contractor: !!s.c,
  rol: s.rol,
  seniority: s.sen,
  is_lider: !!s.lider,
  skills: s.sk || {}
}));

const proyRows = data.proyectos.map((p) => ({
  id: p.id, nombre: p.nombre, tipo: p.tipo,
  inicio: p.inicio, fin: p.fin, recursos: p.recursos || []
}));

const mantRows = data.mantenimientos.map((m) => ({
  id: m.id, nombre: m.nombre, tipo: m.tipo,
  fin: m.fin, lider: m.lider, hs: m.hs || 0
}));

await upsert("staff", staffRows);
await upsert("proyectos", proyRows);
await upsert("mantenimientos", mantRows);

console.log("Listo ✅");
