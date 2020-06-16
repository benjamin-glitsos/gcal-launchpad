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
import pluralise from "pluralise";
import { invertObj } from "~/lib/utilities";

class Symbols {
    keyValues = this.parserSymbols;
    valueKeys = invertObj(process.env.messages);
    keys = Object.keys(process.env.messages);
    values = Object.values(process.env.messages);
    periods = this.keys.map(key => key.toLowerCase());
    periodPlural = this.periods.map(period => period + "s");

    periodFromValue(value) {
        return this.valueKeys[value].toLowerCase();
    }
}

const messages = new Symbols();

export const createDay = (number, period) => {
    const now = moment(new Date(), process.env.settings.timeZone);
    const internationalFormat = m => m.format("YYYY-MM-DD");
    const ifToday = (a, b) => (period === messages.keyValues.TODAY ? a : b);
    const nonZeroNumber = number === 0 ? 1 : number;
    const periodValue = messages.periodFromValue(period);
    return {
        in: {
            number: ifToday(0, nonZeroNumber),
            period: ifToday(periodValue, pluralise(number, periodValue))
        },
        date: internationalFormat(
            ifToday(now, now.add(nonZeroNumber, periodValue))
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

    const period = yield choice(messages.values.map(c => char(c)));

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
