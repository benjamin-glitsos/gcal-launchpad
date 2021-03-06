import { pool } from "~/lib/database";
const SQL = require("sql-template-strings");

export default async (req, res) => {
    const {
        query: { length }
    } = req;
    try {
        const query = await pool.query(SQL`
            SELECT input
            FROM history
            ORDER BY id DESC
            LIMIT ${length}
            `);
        res.status(200).json(query.rows.map(row => row.input));
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
};
