import conds from "conds";

export const cond = xs => conds(xs.map(x => [x.case, x.return]));

export const anyMatches = xs => ys => xs.some(x => ys.includes(x));
