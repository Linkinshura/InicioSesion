const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const usersFile = path.join(__dirname, "data", "users.json");

// Registro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  if (users[email]) return res.send("⚠️ Ya existe una cuenta con ese correo.");

  const hashed = await bcrypt.hash(password, 10);
  users[email] = { name, email, password: hashed };
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.send("✅ Registro exitoso. Ya puedes iniciar sesión.");
});

// Inicio de sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users[email];
  if (!user) return res.send("❌ Usuario no encontrado.");

  const match = await bcrypt.compare(password, user.password);
  if (match) res.send(`🎉 Bienvenido, ${user.name}!`);
  else res.send("❌ Contraseña incorrecta.");
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
