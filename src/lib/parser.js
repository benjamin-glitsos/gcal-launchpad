import moment from "moment";
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
import { cond } from "~/lib/utilities";

const symbols = process.env.settings.symbols.parser;

export default function parser(s, settings) {
    const unchars = s => s.join("");

    const whitespaces = many(whitespace);

    const whitespaces1 = many1(whitespace);

    const notWhitespaces = many1(anythingExcept(whitespace)).map(unchars);

    const words = sepBy1(whitespace)(notWhitespaces);

    const anything = regex(/^.*/);

    const createDay = (optionalNumber = 0, unit) => {
        const isUnit = s => unit === s;
        const now = moment(new Date(), settings.timeZone);
        const future = momentUnit => now.add(optionalNumber, momentUnit);
        return cond([
            { case: x => !optionalNumber, return: now },
            { case: isUnit(symbols.TODAY), return: now },
            { case: isUnit(symbols.DAY), return: future("days") },
            { case: isUnit(symbols.WEEK), return: future("weeks") },
            { case: isUnit(symbols.MONTH), return: future("months") },
            { case: isUnit(symbols.YEAR), return: future("years") },
            { case: true, return: now }
        ])(true);
    };

    const day = coroutine(function* () {
        const optionalNumber = yield possibly(digits);

        const unit = yield choice(Object.values(symbols).map(c => char(c)));

        yield whitespaces;

        return createDay(optionalNumber, unit);
    });

    const days = coroutine(function* () {
        const dayValues = yield sepBy(sequenceOf([char(","), whitespaces]))(
            day
        );

        yield whitespaces1;

        return dayList;
    });

    const event = coroutine(function* () {
        yield whitespaces;

        const dayValues = yield possibly(days).map(ds => {
            console.log(ds);
            return !ds ? [createDay(0, "d")] : ds;
        });

        yield whitespaces;

        const title = yield possibly(anything);

        yield whitespaces;

        return { title, days: dayValues };
    });

    return event.fork(
        s,
        (error, parsingState) => s,
        (result, parsingState) => result
    );
}
