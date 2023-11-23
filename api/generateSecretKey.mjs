import { randomBytes } from 'crypto';

// Генерируем случайную строку в формате hex (шестнадцатеричный)
const secretKey = randomBytes(32).toString('hex');

console.log('Секретный ключ:', secretKey);
