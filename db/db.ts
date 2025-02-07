import SQlite from "expo-sqlite";

export const connectSync = (name: string): SQlite.SQLiteDatabase => {
  const db = SQlite.openDatabaseSync(name);

  return db;
};

/**
 * Takes a database name and returns a database connection.
 * @param {string} name - Name of the database to connect to.
 * @returns {Promise<SQlite.SQLiteDatabase>} A promise that resolves to a database connection.
 */
export const connect = async (name: string): Promise<SQlite.SQLiteDatabase> => {
  const db = await SQlite.openDatabaseAsync(name);

  return db;
};

/**
 * Creates a table schema if it does not exist.
 * @param {SQlite.SQLiteDatabase} db - The database connection.
 * @param {string} tableName - The name of the table.
 * @param {string} schema - The schema definition.
 * @returns {Promise<void>}
 */
export const createSchema = async (
  db: SQlite.SQLiteDatabase,
  tableName: string,
  schema: string
): Promise<void> => {
  const schemaQuery = `CREATE TABLE IF NOT EXISTS ${tableName}, ${schema};`;
  await db.execAsync(schemaQuery);
};

/**
 * Inserts data into a table.
 * @param {SQlite.SQLiteDatabase} db - The database connection.
 * @param {string} tableName - The name of the table.
 * @param {any | any[]} data - The data to insert.
 * @returns {Promise<void>}
 */
export const insert = async (
  db: SQlite.SQLiteDatabase,
  tableName: string,
  data: any | any[]
): Promise<void> => {
  const queryBuilder = (table: string, values: string) =>
    `INSERT INTO ${table} VALUES ${values};`;

  let query = "";

  if (Array.isArray(data)) {
    query = data.reduce((prev, curr) => {
      const test = queryBuilder(tableName, curr);

      return prev + test;
    }, "");
  } else {
    query = queryBuilder(tableName, data);
  }

  await db.execAsync(query);
};

/**
 * Selects data from a table.
 * @param {SQlite.SQLiteDatabase} db - The database connection.
 * @param {string} pattern - The selection pattern.
 * @param {string} table - The name of the table.
 * @returns {Promise<any[]>} A promise that resolves to the selected data.
 */
export const select = async (
  db: SQlite.SQLiteDatabase,
  pattern: string,
  table: string
): Promise<any[]> => {
  const query = `SELECT ${pattern} FROM ${table};`;

  return await db.getAllAsync(query);
};

/**
 * Updates data in a table.
 * @param {SQlite.SQLiteDatabase} db - The database connection.
 * @param {string} table - The name of the table.
 * @param {[string, string]} data [param, value] - The data to update.
 * @param {[string, string]} condition [patten, match]- The condition for the update.
 * @returns {Promise<number>} A promise that resolves to the number of changes.
 */
export const update = async (
  db: SQlite.SQLiteDatabase,
  table: string,
  data: [string, string],
  condition: [string, string]
): Promise<number> => {
  const [param, value] = data;
  const [pattern, match] = condition;

  const res = await db.runAsync(
    `UPDATE ${table} SET ${param} = ? WHERE ${pattern}?`,
    [value, match]
  );

  return res.changes;
};

/**
 * Removes data from a table.
 * @param {SQlite.SQLiteDatabase} db - The database connection.
 * @param {string} table - The name of the table.
 * @param {[string, string]} condition [patten, match]- The condition for the deletion.
 * @returns {Promise<number>} A promise that resolves to the number of changes.
 */
export const remove = async (
  db: SQlite.SQLiteDatabase,
  table: string,
  condition: [string, string]
): Promise<number> => {
  const [pattern, match] = condition;

  const res = await db.runAsync(`DELETE FROM ${table} WHERE ${pattern} ?`, [
    match,
  ]);

  return res.changes;
};

/**
 * Closes the database connection.
 * @param {SQlite.SQLiteDatabase} db - The database connection.
 * @returns {Promise<void>}
 */
export const close = async (db: SQlite.SQLiteDatabase): Promise<void> => {
  await db.closeAsync();
};
