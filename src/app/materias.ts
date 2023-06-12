/**
 * {
      codigo: string,
      asignatura: string,
      creditos: number,
      pre?: string,
      semestre: number,
    }[]
 */
import { Grafico } from "./diagrama.js";
let bloqueadas:{[x:string]:any} = {};
let cuatrimestres: {
  [x: string]: { cantidad: number; aprobadas: number; completada: boolean };
} = {};
let materias_aprobadas = 0;

let relaciones: any[] = [];
let nodos: any = {};
export const materias: {
  [x: string]: {
    asignatura: string;
    creditos: number;
    pre?: string;
    semestre: number;
  };
} = {
  "ADE-101": {
    asignatura: "ADMINISTRACION I",
    creditos: 3,
    semestre: 1,
  },
  "FGC-102": {
    asignatura: "MÉTODO DEL TRABAJO ACADÉMICO",
    creditos: 2,
    semestre: 1,
  },
  "FGC-101": {
    asignatura: "ORIENTACIÓN ACADÉMICA INSTITUCIONAL",
    creditos: 2,
    semestre: 1,
  },
  "FGC-103": {
    asignatura: "METODOLOGÍA DE LA INVESTIGACIÓN",
    creditos: 3,
    semestre: 1,
  },
  "FGC-104": {
    asignatura: "LENGUA ESPAÑOLA I",
    creditos: 3,
    pre: "FGC-102",
    semestre: 2,
  },
  "ING-101": {
    asignatura: "INTRODUCCIÓN A LA INGENIERÍA",
    creditos: 3,
    semestre: 2,
  },
  "FGC-106": {
    asignatura: "TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIÓN I",
    creditos: 3,
    semestre: 2,
  },
  "FGC-105": {
    asignatura: "MATEMÁTICA BÁSICA I",
    creditos: 3,
    pre: "FGC-102",
    semestre: 2,
  },
  "DMF-209": {
    asignatura: "FISICA I",
    creditos: 4,
    pre: "FGC-105",
    semestre: 3,
  },
  "MTI-200": {
    asignatura: "MATEMÁTICA II",
    creditos: 4,
    pre: "FGC-105",
    semestre: 3,
  },
  "FGC-107": {
    asignatura: "HISTORIA SOCIAL DOMINICANA",
    creditos: 3,
    pre: "FGC-102",
    semestre: 3,
  },
  "FGC-108": {
    asignatura: "INGLÉS I",
    creditos: 3,
    pre: "FGC-102",
    semestre: 3,
  },
  "QUI-400": {
    asignatura: "QUÍMICA I",
    creditos: 3,
    pre: "FGC-105",
    semestre: 3,
  },
  "FGC-110": {
    asignatura: "DESARROLLO SOSTENIBLE Y GESTIÓN DE RIESGOS",
    creditos: 2,
    pre: "FGC-102",
    semestre: 4,
  },
  "FGC-109": {
    asignatura: "FILOSOFÍA",
    creditos: 2,
    pre: "FGC-102",
    semestre: 4,
  },
  "MTI-300": {
    asignatura: "MATEMÁTICA III",
    creditos: 4,
    pre: "MTI-200",
    semestre: 4,
  },
  "DMF-210": {
    asignatura: "FISICA II",
    creditos: 4,
    pre: "DMF-209",
    semestre: 4,
  },
  "INF-215": {
    asignatura: "INGENIERÍA ECONÓMICA",
    creditos: 3,
    pre: "MTI-200",
    semestre: 5,
  },
  "MAT-241": {
    asignatura: "ESTADISTICA I",
    creditos: 3,
    pre: "FGC-105",
    semestre: 5,
  },
  "ING-102": {
    asignatura: "CIENCIA E INGENIERÍA DE MATERIALES",
    creditos: 4,
    pre: "QUI-400",
    semestre: 5,
  },
  "ING-103": {
    asignatura: "CÁLCULO INTEGRAL",
    creditos: 4,
    pre: "MTI-300",
    semestre: 5,
  },
  "MAT-242": {
    asignatura: "ESTADISTICA II",
    creditos: 3,
    pre: "MAT-241",
    semestre: 6,
  },
  "INF-222": {
    asignatura: "SISTEMA OPERATIVO I",
    creditos: 3,
    pre: "FGC-106",
    semestre: 6,
  },
  "INF-221": {
    asignatura: "INTRODUCCIÓN A LA PROGRAMACIÓN",
    creditos: 3,
    pre: "FGC-106",
    semestre: 6,
  },
  "ING-105": {
    asignatura: "TALLER DE MECÁNICA DE HARDWARE",
    creditos: 3,
    pre: "FGC-106",
    semestre: 6,
  },
  "ING-104": {
    asignatura: "CÁLCULO VECTORIAL",
    creditos: 4,
    pre: "ING-103",
    semestre: 6,
  },
  "TIC-408": {
    asignatura: "SEGURIDAD DE LA INFORMACIÓN",
    creditos: 3,
    pre: "FGC-106",
    semestre: 7,
  },
  "IND-101": {
    asignatura: "CIENCIA DE LOS DATOS",
    creditos: 3,
    semestre: 7,
  },
  "INF-437": {
    asignatura: "REDES INFORMÁTICAS",
    creditos: 3,
    pre: "FGC-106",
    semestre: 7,
  },
  "ISW-301": {
    asignatura: "TALLER DE PROGRAMACIÓN I",
    creditos: 5,
    pre: "INF-221",
    semestre: 7,
  },
  "ISW-321": {
    asignatura: "TALLER DE BASES DE DATOS I",
    creditos: 4,
    pre: "INF-221",
    semestre: 8,
  },
  "TIC-402": {
    asignatura: "ETICA EN TECNOLOGÍA",
    creditos: 2,
    semestre: 8,
  },
  "IND-404": {
    asignatura: "ELECTIVA I",
    creditos: 3,
    pre: "7MO. CUAT.",
    semestre: 8,
  },
  "IND-314": {
    asignatura: "TEORIA DE LA INFORMACIÓN",
    creditos: 3,
    pre: "IND-101",
    semestre: 8,
  },
  "IND-324": {
    asignatura: "SEÑALES Y SISTEMAS",
    creditos: 3,
    pre: "IND-314",
    semestre: 9,
  },
  "IND-325": {
    asignatura: "BÚSQUEDA Y ANALISIS DE LA INFORMACIÓN",
    creditos: 3,
    pre: "IND-314",
    semestre: 9,
  },
  "IND-334": {
    asignatura: "ESTADÍSTICAS APLICADA A LA CIENCIA DE DATOS",
    creditos: 3,
    pre: "MAT-242",
    semestre: 9,
  },
  "IND-332": {
    asignatura: "HERRAMIENTAS DE ANÁLISIS DE DATOS I",
    creditos: 4,
    pre: "IND-101",
    semestre: 9,
  },
  "IND-335": {
    asignatura: "INGENÍERIA DE DATOS I",
    creditos: 4,
    pre: "IND-314",
    semestre: 9,
  },

  "IND-333": {
    asignatura: "TRATAMIENTO DE AUDIO, VIDEO Y VISIÓN ARTIFICIAL",
    creditos: 4,
    pre: "IND-324",
    semestre: 10,
  },
  "IND-412": {
    asignatura: "HERRAMIENTAS DE ANÁLISIS DE DATOS II",
    creditos: 4,
    pre: "IND-332",
    semestre: 10,
  },
  "IND-405": {
    asignatura: "ELECTIVA II",
    creditos: 3,
    pre: "9NO. C.",
    semestre: 10,
  },
  "IND-401": {
    asignatura: "PROYECTO DE DATOS E IO - I",
    creditos: 5,
    pre: "IND-335",
    semestre: 10,
  },
  "IND-403": {
    asignatura: "PASANTÍA - PRÁCTICA DE INGENIERÍA DE DATOS E IO",
    pre: "IND-335",
    semestre: 10,
    creditos: 0,
  },

  "IND-413": {
    asignatura: "INGENÍERIA DE DATOS II",
    creditos: 4,
    pre: "IND-335",
    semestre: 11,
  },
  "IND-431": {
    asignatura: "VISUALIZACIÓN DE DATOS",
    creditos: 4,
    pre: "IND-325",
    semestre: 11,
  },
  "IND-402": {
    asignatura: "PROYECTO DE DATOS E IO - II",
    creditos: 5,
    pre: "IND-401",
    semestre: 11,
  },
  "IND-414": {
    asignatura: "INGENIERÍA DE BIG DATA",
    creditos: 4,
    pre: "ISW-321",
    semestre: 11,
  },
  "FGC-111": {
    asignatura: "SEMINARIO DE GRADO",
    creditos: 3,
    pre: "FGC-103",
    semestre: 11,
  },
  "IND-421": {
    asignatura: "APLICACIONES E INFRAESTRUCTURA DE BIG DATA",
    creditos: 4,
    pre: "IND-414",
    semestre: 12,
  },
  "IND-423": {
    asignatura: "MINERÍA DE DATOS",
    creditos: 4,
    pre: "ISW-321",
    semestre: 12,
  },
  "IND-432": {
    asignatura: "INTELIGENCIA DE NEGOCIOS",
    creditos: 3,
    pre: "IND-413",
    semestre: 12,
  },

  "IND-600": {
    asignatura: "PROYECTO INTEGRADOR DE DATOS E IO: TRABAJO DE GRADO",
    pre: "FGC-111,IND-402",
    semestre: 12,
    creditos: 0,
  },
};
export const Materias = () => {
  let cuerpo = document.getElementById("cuerpo") as HTMLDivElement;
  document.getElementById("Ctodas")!.innerHTML =
    Object.keys(materias).length.toString();
  cuerpo.innerHTML = "";
  for (let i = 1; i < 13; i++) {
    cuerpo.innerHTML += `<div class ="col-12 mb-3" id="dc${i}"><h4>Cuatrimestre ${i}</h4><div id="cuatrimestre-${i}" class="row"></div><hr></div>`;
    cuatrimestres[`dc${i}`] = { cantidad: 0, aprobadas: 0, completada: false };
  }

  Object.keys(materias).map((codigo) => {
    {
      let i = materias[codigo];
      let temp_relaciones = [];
      let c = i.semestre;
      let pre = "";
      let credito = i.creditos
        ? `<p class="card-text">CR: ${i.creditos}</p>`
        : "";
      let estado = "pendiente";
      cuatrimestres[`dc${c}`]["cantidad"]++;
      let candado = "";
      let bt = "";
      nodos[i.asignatura] = "pendiente";

      if (i.pre) {
        bloqueadas[codigo] = i;

        if (materias[i.pre]) {
          temp_relaciones = [materias[i.pre].asignatura, i.asignatura, 1];
        } else {
          if (codigo === "IND-600") {
            temp_relaciones = [materias["FGC-111"].asignatura, i.asignatura, 1];

            relaciones.push([
              materias["IND-402"].asignatura,
              materias["IND-600"].asignatura,
              1,
            ]);
          } else {
            temp_relaciones = [i.asignatura, , 1];
          }
        }

        pre = `<p class="card-text">Pre: ${i.pre}</p>`;
        estado += " bloqueada";
        candado = `icon-lock`;
        bt = "none";
      } else {
        temp_relaciones = [i.asignatura, , 1];
      }

      relaciones.push(temp_relaciones);
      document.getElementById(
        `cuatrimestre-${c}`
      )!.innerHTML += `<div class="col-6 ${estado} asignaturas"  id="${codigo}">
        <div class="card mb-2">
        <div class="card-header bg-danger-subtle" id="c${codigo}">${codigo}  <span class="${candado}"  id="h${codigo}"></span></div>
          <div class="card-body">
            <h6 class="card-title">${i.asignatura}</h6>
            <div class="row">
              <div class="col-md-6 col-sm-12">${credito}</div>
              <div class="col-md-6 col-sm-12">${pre}</div>
              <div class="d-flex justify-content-between row ">

              <div class="mb-2 col-md-6 col-sm-12" id="Dbt_a_${codigo}" style="display:none"><button type="button" class="btn btn-success btaprobada" id="bt_a_${codigo}">Aprobada</button></div>
              <div class="mb-2 col-md-6 col-sm-12" id="Dbt_p_${codigo}" style="display:${bt}"><button type="button" class="btn btn-danger btpendiente" id="bt_p_${codigo}">Pendiente</button></div>
              <div class="mb-2 col-md-6 col-sm-12" id="Dbt_i_${codigo}"><button type="button" class="btn btn-info btinformacion" id="bt_i_${codigo}" data-bs-toggle="modal" data-bs-target="#infoModal">Información</button></div>
              </div>
            </div>
          </div>
        </div></div>`;
    }
  });
};

export const validacion = (datos:any) => {
  let aprobadas: string[] = [];
  materias_aprobadas = 0;
  const materia = datos.data();

  Object.keys(cuatrimestres).map((c) => {
    cuatrimestres[c]["aprobadas"] = 0;
  });

  (document.getElementById("telefono") as HTMLInputElement).value = materia["telefono"] || "";
  (document.getElementById("nombre") as HTMLInputElement).value = materia["nombre"] || "";
  (document.getElementById("login-email") as HTMLInputElement).value = materia["email"] || "";

  //Recoorrer materias materrias del DB
  let completados:number[] = [];
  let cuatrimesteA: number = 0;

  Object.keys(materia).map((m) => {
    if (materia[m] === "si") {
      document.getElementById(m)!.classList.remove("pendiente", "bloqueada");
      materias_aprobadas++;
      document.getElementById(m)!.classList.add("aprobada");

      document.getElementById(`c${m}`)!.classList.remove("bg-danger-subtle");
      document.getElementById(`c${m}`)!.classList.add("bg-info-subtle");
      document.getElementById(`h${m}`)!.style.display = "none";
      document.getElementById(`Dbt_a_${m}`)!.style.display = "";
      document.getElementById(`Dbt_p_${m}`)!.style.display = "none";
      aprobadas.push(m);
      nodos[materias[m].asignatura] = "aprobadas";
      let s:number = materias[m].semestre;
      cuatrimestres[`dc${s}`]["aprobadas"]++;

      if (
        cuatrimestres[`dc${s}`]["aprobadas"] ===
        cuatrimestres[`dc${s}`]["cantidad"]
      ) {
        cuatrimestres[`dc${s}`]["completada"] = true;
        completados.push(s);
      }
    }
  });
  completados.sort().map((x) => {
    if (cuatrimesteA + 1 === x) cuatrimesteA = x;
    if (cuatrimesteA === 7) aprobadas.push("7MO. CUAT.");
    if (cuatrimesteA === 9) aprobadas.push("9NO. C.");
  });

  document.getElementById("cuatrimesteA")!.innerHTML = cuatrimesteA.toString();

  document.getElementById("Caprobadas")!.innerHTML = materias_aprobadas.toString();
  document.getElementById("Cpendientes")!.innerHTML =
    (Object.keys(materias).length - materias_aprobadas).toString();

  Object.keys(bloqueadas).map((codigo) => {
    let a = document.getElementById(codigo)!.className;
    let i = bloqueadas[codigo];

    if (aprobadas.includes(i.pre) && a.includes("bloqueada")) {
      document.getElementById(codigo)!.classList.remove("bloqueada");
      document.getElementById(codigo)!.classList.add("pendiente");
      document.getElementById(`Dbt_p_${codigo}`)!.style.display = "";
      document.getElementById(`h${codigo}`)!.style.display = "none";
      nodos[materias[codigo].asignatura] = "pendiente";
    }
  });
  let nf = relaciones.filter((x) => {
    if (nodos[x[0]] !== "aprobadas" && nodos[x[1]] !== "aprobadas") return x;
  });
  
  Grafico(nf );
};

const filtros = document.getElementsByName("inlineRadioOptions") as unknown as HTMLInputElement[];

const apagar = (tipo:string, div:string, cantidad:number, aprobadas:number) => {
  let valor = "";

  switch (tipo) {
    case "pendiente":
      valor = cantidad > aprobadas ? "" : "none";
      break;

    case "aprobada":
      valor = aprobadas > 0 ? "" : "none";
      break;
  }

  document.getElementById(div)!.style.display = valor;
};

for (let i = 0; i < filtros.length; i++) {
  filtros[i].addEventListener("change", (_e) => {
    if (filtros[i].checked) {
      let v = filtros[i].value;
      let asignaturas = document.getElementsByClassName("asignaturas") as unknown as HTMLAllCollection;
      Object.keys(cuatrimestres).map((cuatrimeste) => {
        apagar(
          v,
          cuatrimeste,
          cuatrimestres[cuatrimeste]["cantidad"],
          cuatrimestres[cuatrimeste]["aprobadas"]
        );
      });

      for (let j = 0; j < asignaturas.length; j++) {
        const element = asignaturas[j];
        if (element.className.includes(v) || v === "todas") {
          (asignaturas[j] as HTMLDivElement).style.display = "";
        } else {
          (asignaturas[j] as HTMLDivElement).style.display = "none";
        }
      }
    }
  });
}
