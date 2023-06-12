import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const googleButton = document.querySelector("#googleLogin") as HTMLButtonElement;

googleButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
   
    // Close the login modal
    /*const modalInstance = bootstrap.Modal.getInstance(
      googleButton.closest(".modal")
    );
    modalInstance.hide();*/

    // show welcome message

    showMessage(credentials.user.displayName as string);
  } catch (error) {
    console.log(error);
  }
});
