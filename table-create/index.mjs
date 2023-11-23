import {
  createTable,
  checkTableDataCount,
  fillOrderDetails,
  fillProductsDetails,
} from "./table-create.mjs";
import { ORDER_DETAILS_DATA, PRODUCT_DETAILS_DATA } from "./start-date.mjs";

const ORDER_DETAILS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS orderDetails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  title TEXT,
  date TEXT,
  description TEXT,
  products_id TEXT
)`;

const PRODUCTS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS productsDetails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  products_id INT,
  serialNumber INT,
  isNew BOOLEAN,
  photo VARCHAR(255),
  title TEXT,
  type VARCHAR(255),
  specification TEXT,
  guarantee_start TEXT,
  guarantee_end TEXT,
  price TEXT,
  order_id INT,
  date TEXT
)`;
const USRES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  group_users VARCHAR(255) NOT NULL
)
`;


// Использовать async/await для удобства чтения
const main = async () => {
  try {
    await createTable(ORDER_DETAILS_TABLE_SQL);
    await createTable(PRODUCTS_TABLE_SQL);
    // Create the users table
    await createTable(USRES_TABLE_SQL);

    // Проверка и заполнение orderDetails
    const orderDetailsCount = await checkTableDataCount("orderDetails");
    if (orderDetailsCount === 0) {
      await fillOrderDetails(ORDER_DETAILS_DATA);
    }

    const productsDetailsCount = await checkTableDataCount("productsDetails");
    if (productsDetailsCount === 0) {
      await fillProductsDetails(PRODUCT_DETAILS_DATA);
    }

    // Дополнительные действия после создания базы данных и таблиц
  } catch (error) {
    console.error("Error:", error);
  }
};

// Запустить основную функцию
main();
