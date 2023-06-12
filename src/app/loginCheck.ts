const loggedOutLinks = document.querySelectorAll(".logged-out") as unknown as HTMLLinkElement [];
const loggedInLinks = document.querySelectorAll(".logged-in") as unknown as HTMLLinkElement [];
import { showMessage } from "./showMessage.js";

export const loginCheck = (user:any) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
    showMessage(user.displayName)
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
    showMessage('')
    
  }
};