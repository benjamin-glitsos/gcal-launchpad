import conds from "conds";

export const cond = xs => conds(xs.map(x => [x.case, x.return]));

export const isEqual = a => b => a === b;

export const anyMatches = xs => ys => xs.some(x => ys.includes(x));

export function* createId() {
    var index = 0;
    while (true) {
        yield index++;
    }
}

export const invertObj = obj => {
    return Object.keys(obj).reduce((ret, key) => {
        ret[obj[key]] = key;
        return ret;
    }, {});
};

export const randomItem = ls => ls[Math.floor(Math.random() * ls.length)];

export const removeItem = (x, ls) => ls.filter(y => y !== x);
