import { pool } from "~/lib/database";

export default async (req, res) => {
    const {
        query: { username }
    } = req;
    try {
        const query = await pool.query(`
            SELECT h.title
            FROM history h
            ${
                username
                    ? `LEFT JOIN users u ON h.user_id = u.id
            WHERE u.username = '${username}'`
                    : ""
            }
            ORDER BY h.id DESC
            LIMIT 15
            `);
        res.status(200).json(query.rows);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};
