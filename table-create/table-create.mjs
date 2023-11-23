import mysql from 'mysql2';

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Асинхронная функция для создания таблицы, вызывается при подключении к базе данных
const createTable = async (sqlQuery) => {
  let connected = false;

  while (!connected) {
    try {
      await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Error connecting to MySQL:', err.code);
            return reject(err);
          }

          connection.query('SELECT 1', (err) => {
            connection.release();

            if (err) {
              console.error('Error executing test query:', err.code);
              return reject(err);
            }

            connected = true;
            resolve();
          });
        });
      });
    } catch (error) {
      console.error('Error:', error.code);
      console.log('Retrying in 20 seconds...');
      await new Promise(resolve => setTimeout(resolve, 20000));
    }
  }

  // База данных и пользователь доступны, можно создавать таблицу
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.query(sqlQuery, (err) => {
        connection.release();

        if (!err) {
          console.log('Table was created successfully');
        }
        err ? reject(err) : resolve();
      });
    });
  });
};


const checkTableDataCount = async (tableName) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT COUNT(*) as count FROM ${tableName}`, (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
};


const fillOrderDetails = async (data) => {
  const insertPromises = data.map((order) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO orderDetails (order_id, title, date, description, products_id) VALUES (?, ?, ?, ?, ?)',
        [order.order_id, order.title, order.date, order.description, order.products_id],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  });

  await Promise.all(insertPromises);
  console.log('orderDetails data filled successfully');
};


const fillProductsDetails = async (data) => {
  const insertPromises = data.map((product) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO productsDetails (products_id, serialNumber, isNew, photo, title, type, specification, guarantee_start, guarantee_end, price, order_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          product.products_id,
          product.serialNumber,
          product.isNew,
          product.photo,
          product.title,
          product.type,
          product.specification,
          product.guarantee_start,
          product.guarantee_end,
          product.price,
          product.order_id,
          product.date,
        ],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  });

  await Promise.all(insertPromises);
  console.log('productsDetails data filled successfully');
};


export { createTable, checkTableDataCount, fillOrderDetails, fillProductsDetails };
