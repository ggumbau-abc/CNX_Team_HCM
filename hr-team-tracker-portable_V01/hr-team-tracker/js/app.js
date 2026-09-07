/**
 * App principal. Usa DataSource.load() para obtener staff/proyectos/mantenimientos
 * ya sea de local (js/data.js) o de Supabase.
 * Mantiene compatibilidad con las funciones de render originales del MVP.
 */
(function () {
  let staffData = [];
  let proyData = [];
  let mantData = [];
  let skillCols = [];

  function renderStaff(data){
  const tbody = document.getElementById("staffBody");
  tbody.innerHTML = "";
  data.forEach((s,i)=>{
    const tipo = s.c
      ? '<span class="badge badge-c">Contractor</span>'
      : '<span class="badge badge-e">Empleado</span>';
    const lider = s.lider ? "✔" : "";
    const row = `<tr>
      <td>${i+1}</td>
      <td><b>${s.n}</b>${s.id?'<br><small style="color:#a0aec0">#'+s.id+'</small>':''}</td>
      <td>${tipo}</td>
      <td><b>${s.rol}</b></td>
      <td>${s.sen}</td>
      <td style="text-align:center">${lider}</td>
      <td>${skillBadge(s.sk.PY)}</td>
      <td>${skillBadge(s.sk.TM)}</td>
      <td>${skillBadge(s.sk["PA/OM"])}</td>
      <td>${skillBadge(s.sk.EC)}</td>
      <td>${skillBadge(s.sk.TT)}</td>
      <td>${skillBadge(s.sk.PMGM)}</td>
      <td>${skillBadge(s.sk.SMD)}</td>
      <td>${skillBadge(s.sk.RCM)}</td>
      <td>${skillBadge(s.sk.LMS)}</td>
      <td>${skillBadge(s.sk.OPM)}</td>
      <td>${skillBadge(s.sk.INT)}</td>
      <td>${skillBadge(s.sk.ABAP)}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function filterStaff(){
  const q = document.getElementById("searchStaff").value.toLowerCase();
  const rol = document.getElementById("filterRol").value;
  const tipo = document.getElementById("filterTipo").value;
  const filtered = staffData.filter(s=>{
    const matchName = s.n.toLowerCase().includes(q);
    const matchRol  = rol ? s.rol.toLowerCase()===rol.toLowerCase() : true;
    const matchTipo = tipo==="C" ? s.c : tipo==="E" ? !s.c : true;
    return matchName && matchRol && matchTipo;
  });
  renderStaff(filtered);
}

// ---- PROYECTOS ----
function renderProyectos(){
  const cont = document.getElementById("proyCards");
  cont.innerHTML = "";
  proyData.forEach(p=>{
    const total = p.recursos.reduce((a,r)=>a+r.hs,0);
    const max   = Math.max(...p.recursos.map(r=>r.hs),1);
    const bars  = p.recursos.map(r=>`
      <div class="assign-bar">
        <span class="name">${r.nombre}</span>
        <div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(r.hs/max*100)}%"></div></div>
        <span class="hrs">${r.hs}h</span>
      </div>`).join("");
    cont.innerHTML += `<div class="card">
      <h3><span class="badge badge-proj">Proyecto</span> ${p.nombre}</h3>
      <div class="meta">📌 ${p.id} &nbsp;|&nbsp; 📅 ${p.inicio} → ${p.fin}</div>
      <div class="meta">⏱ Total estimado: <b>${total.toLocaleString()}h</b> &nbsp;|&nbsp; 👥 ${p.recursos.length} recursos</div>
      <div style="margin-top:12px">${bars||'<i style="color:#a0aec0">Sin recursos asignados</i>'}</div>
    </div>`;
  });
}

// ---- MANTENIMIENTOS ----
function renderMantenimientos(){
  const cont = document.getElementById("mantCards");
  cont.innerHTML = "";
  mantData.forEach(m=>{
    const fin = new Date(m.fin);
    const hoy = new Date("2026-08-28");
    const diff = Math.ceil((fin-hoy)/(1000*60*60*24));
    const alert = diff<60 ? '<span class="badge pill-warn">⚠️ Vence pronto</span>' : '';
    cont.innerHTML += `<div class="card">
      <h3><span class="badge badge-mant">${m.tipo}</span> ${m.nombre}</h3>
      <div class="meta">📌 ${m.id}</div>
      <div class="meta">👤 Líder: <b>${m.lider}</b></div>
      <div class="meta">📅 Fin: <b>${m.fin}</b> ${alert}</div>
      <div class="meta">⏱ Hs mapeadas: <b>${m.hs}h</b></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(m.hs/440*100,100)}%"></div></div>
    </div>`;
  });
}

// ---- MAPA ----
function renderMapa(){
  const recursos = [
    {n:"Romina Rufat",      proy:1840, mant:0},
    {n:"Patricia Espíndola",proy:1840, mant:0},
    {n:"Robert Bozzoni",    proy:1280, mant:0},
    {n:"Diego Segura",      proy:960,  mant:0},
    {n:"Lourdes Ruffini",   proy:360,  mant:0},
    {n:"Andreina Valenzuela",proy:360, mant:0},
    {n:"Tomas Sande",       proy:312,  mant:324},
    {n:"Leonardo Coelho",   proy:120,  mant:0},
    {n:"Rosangela Ingallina",proy:480, mant:0},
    {n:"Gustavo Zucchelli", proy:0,    mant:440},
    {n:"Vero Ramos",        proy:0,    mant:512},
    {n:"Ender Sanchez",     proy:0,    mant:160},
  ];
  const maxH = Math.max(...recursos.map(r=>r.proy+r.mant));
  const cont = document.getElementById("mapaContent");
  const rows = recursos.map(r=>{
    const tot = r.proy+r.mant;
    const wp  = Math.round(r.proy/maxH*260);
    const wm  = Math.round(r.mant/maxH*260);
    return `<div style="display:flex;align-items:center;gap:10px;margin:8px 0;font-size:.83rem">
      <span style="width:170px;font-weight:600;color:#1e3a5f">${r.n}</span>
      <div style="display:flex;height:14px;border-radius:6px;overflow:hidden;width:260px;background:#f0f4f8">
        ${r.proy?`<div style="width:${wp}px;background:#2d6a9f" title="Proyectos: ${r.proy}h"></div>`:''}
        ${r.mant?`<div style="width:${wm}px;background:#f472b6" title="Mant: ${r.mant}h"></div>`:''}
      </div>
      <span style="color:#6b7280">${tot.toLocaleString()}h total</span>
      ${r.proy?`<span class="pill">Proy: ${r.proy}h</span>`:''}
      ${r.mant?`<span class="pill" style="background:#fce7f3;color:#9d174d">Mant: ${r.mant}h</span>`:''}
    </div>`;
  }).join("");
  cont.innerHTML = `
    <div style="display:flex;gap:20px;margin-bottom:16px;font-size:.8rem">
      <span><span style="display:inline-block;width:14px;height:14px;background:#2d6a9f;border-radius:3px;vertical-align:middle"></span> Proyectos</span>
      <span><span style="display:inline-block;width:14px;height:14px;background:#f472b6;border-radius:3px;vertical-align:middle"></span> Mantenimientos</span>
    </div>
    <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.08)">${rows}</div>`;
}

// ---- NAV ----
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

  // ---- NAV (expuesta al scope global para los onclick del HTML) ----
  window.showPage = function (id) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.querySelectorAll("nav button").forEach((b) => b.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if (typeof event !== "undefined" && event && event.target) {
      event.target.classList.add("active");
    }
  };
  window.filterStaff = filterStaff;

  // ---- INIT ----
  document.addEventListener("DOMContentLoaded", async () => {
    const data = await window.DataSource.load();
    staffData = data.staff || [];
    proyData = data.proyectos || [];
    mantData = data.mantenimientos || [];
    skillCols = data.skillCols || [];

    renderStaff(staffData);
    renderProyectos();
    renderMantenimientos();
    renderMapa();
  });
})();
