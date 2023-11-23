// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { readRecords } from "./records.mjs";
import { registerUser, loginUser, verifyToken } from "./auth.mjs";

const app = express();
const PORT = 4000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.161:3000", 'http://localhost'],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json()); // Добавьте middleware для разбора JSON-тела запроса

app.get("/status", (_, res) => {
  res.send("Hello from the service!");
});

app.get("/loading/:tableName", async (req, res) => {
  const tableName = req.params.tableName;
  res.send(await readRecords(tableName));
});

app.get("/getServerTime", (_, res) => {
  const serverTime = new Date();
  res.send(serverTime.toISOString());
});

// Регистрация нового пользователя
app.post("/register", async (req, res) => {
  try {
    const { username, password, email, group_users } = req.body;
    await registerUser(username, password, email, group_users);
    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Произошла ошибка при регистрации пользователя" });
  }
});

// Авторизация пользователя
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.cookie('token', token, { 
      httpOnly: false,
      secure: true, 
      sameSite: 'Strict',
      path: '/',
    });
    
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Неверное имя пользователя или пароль" });
  }
});


const activeSessions = new Set();

io.on("connection", (socket) => {
  const sessionId = socket.id;

  activeSessions.add(sessionId);
  updateCounter();

  socket.on("disconnect", () => {
    activeSessions.delete(sessionId);
    updateCounter();
  });

  function updateCounter() {
    io.emit("updateCounter", activeSessions.size);
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
