import './style.scss'
import './style/fonts.css'
import './style/style.css'
import 'bootstrap/scss/bootstrap.scss'
import * as bootstrap from 'bootstrap'

import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  getDocs,
  doc,
  query,
  where,
  collection,
} from "firebase/firestore";
import {
  auth,
  db,
  updateMAterias,
  crearmaterias,
  onGetEsrudiantes,
} from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";
import { Materias, validacion, materias } from "./app/materias.js";

//import { setupPosts } from "./app/postList.js";

//import './app/signupForm.js'
//import "./app/login.js";
import "./app/googleLogin.js";

//import './app/githubLogin.js'
import "./app/logout.js";

const telefono = document.getElementById("telefono") as HTMLInputElement;
const loginemail = document.getElementById("login-email") as HTMLInputElement;

//export const getTask = (id) => getDoc(doc(db, "tasks", id));
let usuariogb = "";

// list for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
    try {
      Materias();
      usuariogb = user.uid;

      let id = usuariogb;

      const docRef = doc(db, "estudiantes", id);
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        validacion(querySnapshot);
      } else {
        let datos_estudiantes:{[x:string]:any} = {
          autor: usuariogb,
          nombre: user.displayName,
          email: "",
          telefono: "",
        };

        Object.keys(materias).map((x) => {
          datos_estudiantes[x] = "no";
        });
        crearmaterias(usuariogb, datos_estudiantes);
      }

      onGetEsrudiantes(usuariogb, (querySnapshot:any) => {
        if (querySnapshot.exists()) {
          validacion(querySnapshot);
        }
      });
    } catch (error) {
      console.log({ error });
    }
  } else {
    // setupPosts([]);
    usuariogb = "";
    loginCheck(user);
  }
});

document.getElementById("FMregistro")!.addEventListener("submit", async (e) => {
  e.preventDefault();
  let datos:{[x:string]:any} = {};
  if (loginemail.value !== "") {
    datos["email"] = loginemail.value;
  }

  if (telefono.value !== "") {
    datos["telefono"] = telefono.value;
  }

  if (Object.keys(datos).length === 0) return;
  try {
    await updateMAterias(usuariogb, datos);

    const modalInstance = bootstrap.Modal.getInstance(
      //githubButton.closest(".modal")
      "#signinModal"
    );
    modalInstance!.hide();
  } catch (error) {
    console.log(error);
  }
});

let cuerpo = document.getElementById("cuerpo") as HTMLDivElement;

cuerpo.addEventListener("click", async (e:any) => {
  let clase = e.target.className || "";
  let materia:string = e.target.id.split("_")[2];
  
  let datos:{[x:string]:string} = {};
  

  if (clase.includes("btaprobada")) {
  
  
    datos[materia] = "no";

    updateMAterias(usuariogb, datos);
  }

  if (clase.includes("btpendiente")) {


    let datos:{[x:string]:string} = {};
    datos[materia] = "si";

    updateMAterias(usuariogb, datos);
  }

  /**
   * Botones de información de estudiantes abilesd
   */

  if (clase.includes("btinformacion")) {
    let iden = e.target.id;
    let materia = iden.split("_")[2];

    let q = query(collection(db, "estudiantes"), where(materia, "!=", "si"));

    /*if (materias[materia].pre) {
     
     
      q = query(
        collection(db, "estudiantes"),
        where(materia, "!=", "si"),
        where(pre, "==", "si")
      );
    }*/
    let pre:any = materias[materia].pre;
    let listaEstudiantes = "";
    let valores = await getDocs(q);
    document.getElementById("Dpendinte")!.innerHTML = "";
    if (materias[materia].pre) {
      document.getElementById(
        "Dpendinte"
      )!.innerHTML = `<h6>Prerequisito</h6><h6>${materias[pre].asignatura}</h6>`;
    }
    

    let estudiantex:any[] = [];
    valores.forEach((x) => {
      estudiantex.push(x.data());
    });

    estudiantex.sort((a, b) => {
      if (a["nombre"].toLowerCase() > b["nombre"].toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });

    estudiantex.forEach((i) => {
      if (
        (materias[materia].pre && i[pre] === "si") ||
        !materias[materia].pre
      ) {
        let telefono_pendiente = i["telefono"] ? `<p>${i["telefono"]}</p>` : "";
        listaEstudiantes += `<li class="list-group-item text-capitalize"><p>${i[
          "nombre"
        ].toLowerCase()}</p>${telefono_pendiente}</li>`;
      }
    });

    document.getElementById(
      "listaEstudiantes"
    )!.innerHTML = `<ul class="list-group">${listaEstudiantes}</ul>`;
  }
});
