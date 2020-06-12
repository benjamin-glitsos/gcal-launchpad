import { pool } from "~/lib/database";

export default async (req, res) => {
    try {
        const query = await pool.query(`
            SELECT title
            FROM history
            ORDER BY id DESC
            LIMIT 15
            `);
        res.status(200).json(query.rows);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};
