import { signOut } from "firebase/auth"
import { auth } from "./firebase.js";

const logout = document.querySelector("#logout") as HTMLLinkElement ;

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth)
    console.log("signup out");
  } catch (error) {
    console.log(error)
  }
});