/**
 * Datos locales (fallback / modo offline).
 * Estos son los datos hardcodeados originales del MVP 1.
 * Cuando Supabase esté configurado en js/config.js, la app usará las tablas remotas.
 */
window.LOCAL_DATA = {
  skillCols: ["PY","TM","PA/OM","EC","TT","PMGM","SMD","RCM","LMS","OPM","INT","ABAP"],

  staff: [
  {n:"Sergio Sarasti",id:"102344390",c:true,rol:"EC",sen:"SR",lider:false,sk:{EC:"x",PMGM:"x",RCM:"x",LMS:"x"}},
  {n:"Leonardo dos Santos Coelho",id:"102938302",c:true,rol:"EC",sen:"SR",lider:false,sk:{EC:"C",PMGM:"x",RCM:"C"}},
  {n:"Andreina Valenzuela Mendoza",id:"102897208",c:false,rol:"EC",sen:"SR",lider:false,sk:{PMGM:"C",SMD:"C"}},
  {n:"Rosangela Ingallina",id:"103239894",c:true,rol:"EC",sen:"SR",lider:false,sk:{EC:"x",PMGM:"x"}},
  {n:"Ana Florencia Bueler",id:"102130086",c:true,rol:"EC",sen:"SR",lider:false,sk:{EC:"C",OPM:"x"}},
  {n:"Eugenio Trabazzo",id:"103348044",c:true,rol:"Int",sen:"SR",lider:false,sk:{INT:"x"}},
  {n:"Nicolas Salazar",id:"102474985",c:true,rol:"TT",sen:"SR",lider:false,sk:{EC:"x",TT:"x",INT:"x"}},
  {n:"Robert Moreels Bozzoni",id:"102992933",c:true,rol:"int",sen:"SR",lider:false,sk:{INT:"x"}},
  {n:"Lourdes Ruffini",id:"102174882",c:true,rol:"EC",sen:"SR",lider:false,sk:{PMGM:"x",SMD:"x"}},
  {n:"Ender Sánchez",id:"103154621",c:false,rol:"LD",sen:"SSR",lider:true,sk:{PY:"C"}},
  {n:"Kervin Eduardo Alfonzo Perez",id:"102833407",c:false,rol:"PY",sen:"SR",lider:false,sk:{PY:"C"}},
  {n:"Eduardo Ramirez Garcia",id:"102009338",c:false,rol:"PY",sen:"SR",lider:false,sk:{PY:"C",TT:"x"}},
  {n:"Joel Castano",id:"101993351",c:true,rol:"PY",sen:"SR",lider:false,sk:{PY:"x"}},
  {n:"Kevin Argañaraz",id:"102910524",c:true,rol:"PY",sen:"SR",lider:false,sk:{PY:"x"}},
  {n:"Gustavo Alamo Portella",id:"102069978",c:false,rol:"PY",sen:"SR",lider:true,sk:{PY:"C",TM:"x"}},
  {n:"Juan Condoluci",id:"102852128",c:true,rol:"TM",sen:"SR",lider:false,sk:{TM:"x",PMGM:"x"}},
  {n:"Maria Pruyas",id:"103195561",c:false,rol:"PY",sen:"SR",lider:false,sk:{PY:"x"}},
  {n:"Verónica Ana Ramos",id:"102009412",c:false,rol:"LD",sen:"SR",lider:true,sk:{PY:"x"}},
  {n:"Sergio David Leibovich",id:"101930818",c:true,rol:"LD",sen:"SR",lider:true,sk:{}},
  {n:"Gustavo Zucchelli",id:"102833502",c:false,rol:"LD",sen:"SR",lider:true,sk:{}},
  {n:"Romina Rufat",id:"102344012",c:true,rol:"LD",sen:"SR",lider:true,sk:{}},
  {n:"John Méndez Barreto",id:"103000914",c:true,rol:"PY",sen:"SR",lider:false,sk:{RCM:"x"}},
  {n:"Romina Lorena Stella Manteiga",id:"102322355",c:true,rol:"PY",sen:"SR",lider:true,sk:{}},
  {n:"Diego Segura",id:"103451217",c:true,rol:"PY",sen:"SR",lider:false,sk:{EC:"C"}},
  {n:"Nadia Verónica Zapata",id:"103465360",c:true,rol:"LMS",sen:"SR",lider:false,sk:{EC:"x",PMGM:"x",SMD:"x",RCM:"x",LMS:"x"}},
  {n:"Patricia Espinola",id:"103575760",c:true,rol:"EC",sen:"SR",lider:false,sk:{EC:"x",PMGM:"x",SMD:"x",RCM:"C",OPM:"x"}},
  {n:"Tomas Sande",id:"",c:false,rol:"LD",sen:"SR",lider:true,sk:{}},
  {n:"Matías Popken",id:"103581439",c:true,rol:"EC",sen:"SR",lider:false,sk:{EC:"x",TT:"x"}},
],

  proyectos: [
  {
    id:"PJ-8012561",nombre:"Banco Macro · Reingeniería SuccessFactors EC",
    tipo:"Proyecto",inicio:"2026-05-01",fin:"2027-04-30",
    recursos:[
      {rol:"Director",nombre:"Guillermo Lesta",hs:192},
      {rol:"Líder",nombre:"Romina Rufat",hs:1840},
      {rol:"EC",nombre:"Patricia Espíndola",hs:1840},
      {rol:"EC",nombre:"Rosangela Ingallina",hs:480},
      {rol:"TT",nombre:"Diego Segura",hs:960},
      {rol:"INTE",nombre:"Robert Bozzoni",hs:1280},
    ]
  },
  {
    id:"PJ-8013078",nombre:"AA2000 · Implementación Módulos SSFF W@R",
    tipo:"Proyecto",inicio:"2026-06-01",fin:"2026-07-31",
    recursos:[]
  },
  {
    id:"PJ-980010620",nombre:"Caminos SSFF · Servicio de Implementación",
    tipo:"Proyecto",inicio:"2026-08-01",fin:"2027-01-31",
    recursos:[
      {rol:"Director",nombre:"Gonzalo Gumbau",hs:144},
      {rol:"Líder",nombre:"Tomas Sande",hs:312},
      {rol:"EP",nombre:"Leonardo Coelho",hs:120},
      {rol:"PM GM",nombre:"Lourdes Ruffini",hs:360},
      {rol:"SDM",nombre:"Andreina Valenzuela",hs:360},
    ]
  },
],

  mantenimientos: [
  {id:"PJ-C000833",nombre:"Rowing - Desarrollo ServiceOne",tipo:"M. Service One",fin:"2026-08-31",lider:"Vero Ramos",hs:110},
  {id:"PJ-C000499",nombre:"Caminos - ServiceOne",tipo:"M. Service One",fin:"2027-06-30",lider:"Vero Ramos",hs:100},
  {id:"PJ-C000940",nombre:"FUES 21 - Service One",tipo:"M. Service One",fin:"2026-12-31",lider:"Vero Ramos",hs:100},
  {id:"PJ-C000944",nombre:"Aguas Cordobesas - Desarrollo Service One",tipo:"M. Service One",fin:"2026-12-31",lider:"Vero Ramos",hs:32},
  {id:"PJ-C000947",nombre:"BANCOR - ServiceOne",tipo:"M. Service One",fin:"2026-12-31",lider:"Vero Ramos",hs:100},
  {id:"PJ-C000500",nombre:"Camuzzi - MTO. Licencias SAP",tipo:"Canal",fin:"2026-12-31",lider:"Vero Ramos",hs:0},
  {id:"PJ-C000927",nombre:"AUSA - Desarrollo y Soporte SAP",tipo:"Mant. dedicado",fin:"2028-01-31",lider:"Amalia Yanez",hs:120},
  {id:"PJ-C000900",nombre:"BC&L - Soporte y Mantenimiento SAP HCM/ERP",tipo:"Mant. dedicado",fin:"2026-08-31",lider:"Dani Forte",hs:160},
  {id:"PJ-C000824",nombre:"Metrogas - HCM Desarrollo y Support",tipo:"Mant. dedicado",fin:"2026-08-31",lider:"Ender Sanchez",hs:160},
  {id:"PJ-8011704",nombre:"Banco Galicia - Soporte HCM y BTP",tipo:"Mant. dedicado",fin:"2026-12-31",lider:"Gustavo Zucchelli",hs:440},
  {id:"PJ-8004399",nombre:"Fratelli - Desarrollo SuccessFactors",tipo:"Mant. dedicado",fin:"2026-12-31",lider:"Sergio Leibovich",hs:30},
  {id:"PJ-8004550",nombre:"AA2000 - Desarrollos AMS SuccessFactors",tipo:"Mant. dedicado",fin:"2026-07-31",lider:"Tomas Sande",hs:324},
  {id:"PJ-8011688",nombre:"Mercedes-Benz Camiones y Buses SAU",tipo:"Mant. dedicado",fin:"2029-05-31",lider:"Vero Ramos",hs:180},
]
};
