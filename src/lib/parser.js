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

const symbols = {
    today: "t",
    day: "d",
    week: "w",
    month: "m",
    year: "y"
};

const unchars = s => s.join("");

const whitespaces = many(whitespace);

const notWhitespaces = many1(anythingExcept(whitespace)).map(unchars);

const words = sepBy1(whitespace)(notWhitespaces);

const anything = regex(/^.*/);

const createDay = (optionalNumber = 0, unit) => {
    const isUnit = s => unit === s;
    const now = moment(new Date(), process.env.settings.timeZone);
    const future = momentUnit => now.add(optionalNumber, momentUnit);
    return cond([
        { case: x => !optionalNumber, return: now },
        { case: isUnit(symbols.today), return: now },
        { case: isUnit(symbols.day), return: future("days") },
        { case: isUnit(symbols.week), return: future("weeks") },
        { case: isUnit(symbols.month), return: future("months") },
        { case: isUnit(symbols.year), return: future("years") }
        { case: true, return: now }
    ])(true);
};

const day = coroutine(function* () {
    const optionalNumber = yield possibly(digits);

    const unit = yield choice(Object.values(symbols).map(c => char(c)));

    yield whitespaces;

    return createDay(optionalNumber, unit);
});

const event = coroutine(function* () {
    yield whitespaces;

    const days = yield sepBy(sequenceOf([char(","), whitespaces]))(day);

    yield whitespaces;

    const title = yield possibly(anything);

    yield whitespaces;

    return { title, days };
});

export default function parser(s) {
    return event.fork(
        s,
        (error, parsingState) => s,
        (result, parsingState) => result
    );
}
