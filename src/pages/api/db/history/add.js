import { pool } from "~/lib/database";

export default async (req, res) => {
    const {
        query: { input }
    } = req;
    try {
        const query = await pool.query(
            `INSERT INTO history(input) VALUES ('${input}')`
        );
        res.status(200).json(query.rows);
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
};
