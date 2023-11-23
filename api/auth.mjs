// auth.mjs
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Регистрация пользователя
export async function registerUser(username, password, email, group_users) {
  const hashedPassword = await bcryptjs.hash(password, 10);

  const [result] = await pool.execute(
    'INSERT INTO users (name, password_hash, email, group_users) VALUES (?, ?, ?, ?)',
    [username, hashedPassword, email, group_users]
  );

  if (result.affectedRows !== 1) {
    throw new Error('Не удалось зарегистрировать пользователя');
  }

  return result;
}

// Авторизация пользователя
export async function loginUser(email, password) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  const user = rows[0];
  if (!user || !(await bcryptjs.compare(password, user.password_hash))) {
    throw new Error('Неверный email или пароль');
  }

  const tokenExpiration = process.env.TOKEN_EXPIRATION || '1h';
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ email: user.email, group_users: user.group_users }, secretKey, { expiresIn: tokenExpiration });
  return token;
}


// Функция для проверки подлинности токена
export async function verifyToken(token) {
  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Недействительный токен');
  }
}