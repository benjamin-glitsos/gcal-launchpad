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
    parserSymbols = process.env.parserSymbols;
    keyValues = this.parserSymbols;
    valueKeys = invertObj(this.parserSymbols);
    keys = Object.keys(this.parserSymbols);
    values = Object.values(this.parserSymbols);
    periods = this.keys.map(key => key.toLowerCase());
    periodPlural = this.periods.map(period => period + "s");

    periodFromValue(value) {
        return this.valueKeys[value].toLowerCase();
    }
}

const symbols = new Symbols();

export const createDay = (number, period) => {
    const now = moment(new Date(), process.env.settings.timeZone);
    const isToday = period === symbols.keyValues.TODAY;
    const isTomorrow = period === symbols.keyValues.DAY && number === 1;
    const nonZeroNumber = number === 0 ? 1 : number;
    const periodValue = symbols.periodFromValue(period);
    const date = isToday ? now : now.add(nonZeroNumber, periodValue);
    const totalDays = moment.duration(number, period).asDays();
    return {
        in: {
            number: isToday || isTomorrow ? 0 : nonZeroNumber,
            period: isToday
                ? periodValue
                : isTomorrow
                ? "tomorrow"
                : pluralise(number, periodValue),
            totalDays
        },
        date: {
            international: date.format(
                process.env.settings.internationalDateFormat
            ),
            natural: date.format(process.env.settings.naturalDateFormat)
        }
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

    return createDay(optionalNumber || 1, period);
});

const days = coroutine(function* () {
    const dayValues = yield sepBy1(
        sequenceOf([whitespaces, char(","), whitespaces])
    )(day);

    yield whitespaces1;

    const sortedDayValues = [...dayValues].sort((a, b) =>
        a.date.international.localeCompare(b.date.international)
    );

    return sortedDayValues;
});

const event = coroutine(function* () {
    yield whitespaces;

    const dayValues = yield possibly(days).map(ds =>
        !ds ? [createDay(1, "t")] : ds
    );

    yield whitespaces;

    const optionalTitle = yield possibly(anything);

    yield whitespaces;

    return { title: optionalTitle || "...", days: dayValues };
});

export default function parser(s) {
    return event.fork(
        s,
        (error, parsingState) => s,
        (result, parsingState) => result
    );
}
