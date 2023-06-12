const signInForm = document.querySelector("#login-form") as HTMLFormElement;

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const nombre = signInForm["nombre"].value;
  const telefono= signInForm["telefono"].value;


  console.log({telefono,nombre,email})


  })