import conds from "conds";
import moment from "moment";

export const cond = xs => conds(xs.map(x => [x.case, x.return]));

export const anyMatches = xs => ys => xs.some(x => ys.includes(x));

export function* createId() {
    var index = 0;
    while (true) {
        yield index++;
    }
}

export const ifValidId = (id, f) => {
    if (!Number.isNaN(parseInt(id))) {
        f();
    }
};

export const createDay = (optionalNumber = 0, unit, timeZone) => {
    const symbols = process.env.settings.symbols.parser;
    const isUnit = s => unit === s;
    const now = moment(new Date(), timeZone);
    const future = momentUnit => now.add(optionalNumber, momentUnit);
    const internationalFormat = m => m.format("YYYY-MM-DD");
    return internationalFormat(
        cond([
            { case: x => !optionalNumber, return: now },
            { case: isUnit(symbols.TODAY), return: now },
            { case: isUnit(symbols.DAY), return: future("days") },
            { case: isUnit(symbols.WEEK), return: future("weeks") },
            { case: isUnit(symbols.MONTH), return: future("months") },
            { case: isUnit(symbols.YEAR), return: future("years") },
            { case: true, return: now }
        ])(true)
    );
};
