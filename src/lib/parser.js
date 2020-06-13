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
import { createDay } from "~/lib/utilities";

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

    return createDay(optionalNumber, unit, process.env.settings.timeZone);
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
