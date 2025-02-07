import * as DB from "./db";

export interface Session {
  id: string;
  url: string;
  token: string;
}
const TABLE_NAME = "session";
const db = DB.connectSync("session.db");
DB.createSchema(db, "session", "id TEXT PRIMARY KEY, url TEXT, token TEXT");

/**
 * Gets the current session from the database.
 *
 * Returns null if there is no session.
 *
 * @returns {Promise<Session | null>}
 */
export async function getSession(): Promise<Session | null> {
  const sessions = await DB.select(db, "*", TABLE_NAME);

  if (sessions.length == 0) return null;

  const data: any = sessions[0];

  if (!data?.id || !data?.url || !data?.token) {
    throw new Error("Missing required session data on getSession call");
  }

  return {
    id: data.id,
    url: data.url,
    token: data.token,
  };
}

/**
 * Gets all the sessions from the database.
 *
 * @returns {Promise<Session[]>} All the sessions in the database.
 */
export async function getAllSessions(): Promise<Session[]> {
  const sessions = await DB.select(db, "*", TABLE_NAME);

  let buffer: Session[] = [];

  for (const session of sessions) {
    if (!session?.id || !session?.url || !session?.token) {
      continue;
    }

    buffer.push({
      id: session.id,
      url: session.url,
      token: session.token,
    });
  }

  return [];
}

/**
 * Sets the current session in the database.
 *
 * If there is already a session in the database, it will be overwritten.
 *
 * @param {Session} session - The session to write to the database.
 * @returns {Promise<void>}
 */
export async function setSession(session: Session): Promise<void> {
  const stringValues = `(${session.id}, ${session.url},${session.token})`;

  await DB.insert(db, TABLE_NAME, stringValues);
}

/**
 * Removes a session from the database.
 *
 * @param {string} id - The ID of the session to remove.
 *
 * @returns {Promise<void>}
 */
export async function removeSession(id: string): Promise<void> {
  await DB.remove(db, TABLE_NAME, ["id ==", id]);
}
