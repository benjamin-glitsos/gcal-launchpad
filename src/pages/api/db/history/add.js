import { pool } from "~/lib/database";
const SQL = require("sql-template-strings");

export default async (req, res) => {
    const {
        query: { input }
    } = req;
    try {
        const query = await pool.query(
            SQL`INSERT INTO history(input) VALUES ('${input}')`
        );
        res.status(200).json(query.rows);
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
};
