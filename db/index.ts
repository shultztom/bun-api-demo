import { Database } from "bun:sqlite";

const db = new Database(":memory:");

console.log(`Creating name_table on db`);
const query = db.query(`CREATE TABLE IF NOT EXISTS name_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR)`);
query.run();

export {
    db
}