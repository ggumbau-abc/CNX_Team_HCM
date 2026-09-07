# HR Team Tracker · MVP 1

Aplicación **estática** (HTML + CSS + JS vanilla, **sin build**) para gestión de capacidades, proyectos y mantenimientos del equipo. Diseñada para ser **100% portable**: se hostea directamente en **GitHub Pages** y opcionalmente conecta a **Supabase** para datos dinámicos.

---

## 🚀 Demo local

```bash
# Con cualquier servidor estático
npx serve .
# o
python3 -m http.server 8080
```

Abrí `http://localhost:8080`.

Al iniciar, en el footer verás la fuente de datos: `local` o `supabase`.

---

## 📁 Estructura

```
hr-team-tracker/
├── index.html               # Marcado + navegación
├── css/styles.css           # Estilos
├── js/
│   ├── config.js            # Config Supabase (editar aquí)
│   ├── data.js              # Datos locales (fallback offline)
│   ├── dataSource.js        # Capa de acceso: local o Supabase (REST)
│   └── app.js               # Render / filtros / navegación
├── supabase/
│   ├── schema.sql           # DDL para crear tablas + RLS
│   └── seed.js              # Script Node 18+ para poblar Supabase
└── .github/workflows/
    └── deploy.yml           # CI: publica en GitHub Pages
```

---

## 🌐 Deploy en GitHub Pages (2 opciones)

### Opción A · GUI (más simple)
1. Subí el repo a GitHub.
2. **Settings → Pages → Source: `Deploy from a branch`** → rama `main`, carpeta `/ (root)`.
3. En 1-2 min tu app estará en `https://<usuario>.github.io/<repo>/`.

### Opción B · GitHub Actions (recomendado)
Ya viene incluido `.github/workflows/deploy.yml`. Simplemente:
1. Subí el repo.
2. **Settings → Pages → Source: `GitHub Actions`**.
3. Cada push a `main` publica automáticamente.

---

## 🗄️ Conectar Supabase (opcional)

Por defecto la app usa datos locales del archivo `js/data.js`. Si querés persistencia en la nube:

### 1) Crear proyecto Supabase
- Ir a [supabase.com](https://supabase.com) → New Project.
- Copiar `Project URL` y `anon public key` (Settings → API).

### 2) Crear tablas
- **SQL Editor → New query** → pegar el contenido de `supabase/schema.sql` → Run.

### 3) Cargar datos iniciales
```bash
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."   # NO uses esta key en el front
node supabase/seed.js
```

### 4) Activar Supabase en el front
Editá `js/config.js`:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://xxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...ANON..."   // clave anon, no service_role
};
```

También podés definir `window.__ENV` antes de cargar `config.js` (útil si inyectás valores en tiempo de deploy).

⚠️ **Seguridad**: solo publicá la `anon key`. La `service_role` **nunca** debe ir al front. Las policies RLS del `schema.sql` permiten SELECT público y restringen escritura a usuarios autenticados.

---

## 🧩 Modelo de datos

**staff**
| campo | tipo | nota |
|---|---|---|
| nombre | text | nombre visible |
| employee_id | text | legajo |
| is_contractor | bool | Contractor `[C]` |
| rol | text | EC, PY, TT, Int, LMS, TM |
| seniority | text | JR/SSR/SR |
| is_lider | bool | responsable de equipo |
| skills | jsonb | ej: `{ "EC": "x", "PMGM": "C" }` |

**proyectos** — `id`, `nombre`, `tipo`, `inicio`, `fin`, `recursos jsonb`

**mantenimientos** — `id`, `nombre`, `tipo`, `fin`, `lider`, `hs`

---

## ✅ Ventajas de esta arquitectura

- **Sin build**: no hay `npm install`, no hay bundler. Editás y refrescás.
- **Portable**: corre en cualquier hosting estático (GitHub Pages, Netlify, Vercel, S3, Nginx).
- **Offline-first**: si Supabase falla, cae al dataset local sin romper la UI.
- **Sin dependencias externas** en el front (nada de CDNs de terceros).

---

## 📝 Licencia

MIT — ver `LICENSE`.
