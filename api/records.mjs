import pool from './mysqlPool.mjs'

const readRecords = (table) =>
  new Promise((resolve, reject) =>
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(
        `SELECT * FROM ${table} ORDER BY id DESC`,
        (err, results) => {
          connection.release();
          if (err) return reject(err);
          resolve(results);
        }
      );
    })
  );

export { readRecords }
