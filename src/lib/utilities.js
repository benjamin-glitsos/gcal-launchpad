import conds from "conds";

export const cond = xs => conds(xs.map(x => [x.case, x.return]));

export const anyMatches = xs => ys => xs.some(x => ys.includes(x));

export function* createId() {
    var index = 0;
    while (true) {
        yield index++;
    }
}

export const ifValidId = (id, f) => {
    if (parseInt(id).isInteger()) {
        f();
    } else {
        console.error("Cannot pass a non-integer ID.");
    }
};
