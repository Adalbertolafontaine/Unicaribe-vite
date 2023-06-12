// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9zz-YrD4LuDdgAqElHF0q4dt3TbsM3PI",
  authDomain: "unicaribe-datos.firebaseapp.com",
  projectId: "unicaribe-datos",
  storageBucket: "unicaribe-datos.appspot.com",
  messagingSenderId: "565705814519",
  appId: "1:565705814519:web:1ea2b03ca84a664dbd3ef2",
  measurementId: "G-L6NW7BS1T5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
const estudiantesRef = collection(db, "estudiantes");
export const getTask = (id:string) => getDoc(doc(db, "estudiantes", id));

export const crearmaterias = (id:string, datos:any) =>
  setDoc(doc(estudiantesRef, id), datos);

export const updateMAterias = (id:string, newFields:any) =>
  updateDoc(doc(estudiantesRef, id), newFields);

/*export const savEstudiante = (description) =>
  addDoc(estudiantesRef,  description);*/

export const onGetEsrudiantes = (id:string, callback:any) =>
  onSnapshot(doc(db, "estudiantes", id), callback);
