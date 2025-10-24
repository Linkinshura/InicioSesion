// Registro
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: regName.value,
    email: regEmail.value,
    password: regPass.value,
  };
  const res = await fetch("/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  const msg = await res.text();
  mensaje.textContent = msg;
});

// Inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    email: logEmail.value,
    password: logPass.value,
  };
  const res = await fetch("/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  const msg = await res.text();
  mensaje.textContent = msg;
});
