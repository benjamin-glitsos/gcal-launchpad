import { Pool } from "pg";
import querystring from "querystring";

export const pool = new Pool();

export const fetchApi = (pathLs, queryObj) => {
    const path = [process.env.settings.api].concat(pathLs).join("");
    const query =
        Object.keys(queryObj).length > 0
            ? `?${querystring.stringify(queryObj)}`
            : "";
    return fetch(path + query);
};
