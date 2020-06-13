import {
    sepBy,
    sepBy1,
    whitespace,
    many,
    many1,
    anythingExcept,
    possibly,
    number,
    char,
    digits,
    choice,
    coroutine,
    regex,
    sequenceOf
} from "arcsecond";
import moment from "moment";
import { cond } from "~/lib/utilities";

export const createDay = (optionalNumber, unit, timeZone) => {
    const symbols = process.env.settings.symbols.parser;
    const isUnit = s => unit === s;
    const now = moment(new Date(), timeZone);
    const future = momentUnit => now.add(optionalNumber, momentUnit);
    const internationalFormat = m => m.format("YYYY-MM-DD");
    return {
        in: {
            number: optionalNumber,
            unit
        },
        date: internationalFormat(
            cond([
                { case: x => !optionalNumber, return: now },
                { case: isUnit(symbols.TODAY), return: now },
                { case: isUnit(symbols.DAY), return: future("days") },
                { case: isUnit(symbols.WEEK), return: future("weeks") },
                { case: isUnit(symbols.MONTH), return: future("months") },
                { case: isUnit(symbols.YEAR), return: future("years") },
                { case: true, return: now }
            ])(true)
        )
    };
};

const unchars = s => s.join("");

const whitespaces = many(whitespace);

const whitespaces1 = many1(whitespace);

const notWhitespaces = many1(anythingExcept(whitespace)).map(unchars);

const words = sepBy1(whitespace)(notWhitespaces);

const anything = regex(/^.*/);

const day = coroutine(function* () {
    const optionalNumber = yield possibly(digits);

    const unit = yield choice(
        Object.values(process.env.settings.symbols.parser).map(c => char(c))
    );

    return createDay(optionalNumber || 0, unit, process.env.settings.timeZone);
});

const days = coroutine(function* () {
    const dayValues = yield sepBy1(
        sequenceOf([whitespaces, char(","), whitespaces])
    )(day);

    yield whitespaces1;

    return dayValues;
});

const event = coroutine(function* () {
    yield whitespaces;

    const dayValues = yield possibly(days).map(ds =>
        !ds ? [createDay(0, "d", process.env.settings.timeZone)] : ds
    );

    yield whitespaces;

    const title = yield possibly(anything);

    yield whitespaces;

    return { title, days: dayValues };
});

export default function parser(s) {
    return event.fork(
        s,
        (error, parsingState) => s,
        (result, parsingState) => result
    );
}
