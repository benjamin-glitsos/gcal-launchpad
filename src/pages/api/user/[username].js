import { pool } from "~/lib/database";

export default async (req, res) => {
    const {
        query: { slug }
    } = req;
    const username = slug[0];
    try {
        const query = await pool.query(`
            SELECT *
            FROM users
            WHERE username = '${username}'
            `);
        res.status(200).json(query.rows);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};
