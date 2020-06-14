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
import { invertObj } from "~/lib/utilities";

class Symbols {
    parserSymbols = process.env.settings.symbols.parser;
    keyValues = this.parserSymbols;
    valueKeys = invertObj(this.parserSymbols);
    keys = Object.keys(this.parserSymbols);
    values = Object.values(this.parserSymbols);
    periods = this.keys.map(key => key.toLowerCase());
    periodPlural = this.periods.map(period => period + "s");

    periodFromValue(value) {
        return this.valueKeys[value].toLowerCase();
    }

    periodPluralFromValue(value) {
        return (
            this.periodFromValue(value) +
            (value === this.keyValues.TODAY ? "" : "s")
        );
    }
}

const symbols = new Symbols();

export const createDay = (number, period) => {
    const now = moment(new Date(), process.env.settings.timeZone);
    const internationalFormat = m => m.format("YYYY-MM-DD");
    const numberToAdd = number === 0 ? 1 : number;
    return {
        in: {
            number: numberToAdd,
            period: symbols.periodPluralFromValue(period)
        },
        date: internationalFormat(
            period === symbols.keyValues.TODAY
                ? now
                : now.add(numberToAdd, symbols.periodFromValue(period))
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

    const period = yield choice(symbols.values.map(c => char(c)));

    return createDay(optionalNumber || 0, period);
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
        !ds ? [createDay(0, "t")] : ds
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
