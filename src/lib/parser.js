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

const unchars = s => s.join("");

const whitespaces = many(whitespace);

const notWhitespaces = many1(anythingExcept(whitespace)).map(unchars);

const words = sepBy1(whitespace)(notWhitespaces);

const daySymbol = char("d");

const anything = regex(/^.*/);

const day = coroutine(function* () {
    const optionalNumber = yield possibly(digits);

    const unit = yield daySymbol;

    yield whitespaces;

    return { optionalNumber, unit };
});

const event = coroutine(function* () {
    yield whitespaces;

    const days = yield sepBy(sequenceOf([char(","), whitespaces]))(day);

    yield whitespaces;

    const title = yield possibly(anything);

    yield whitespaces;

    return { days, title };
});

export default function parser(s) {
    return event.fork(
        s,
        (error, parsingState) => error,
        (result, parsingState) => result
    );
}

// const parser = R.pipe(sanitise, s =>
//     event.fork(
//         s,
//         (error, parsingState) => error,
//         (result, parsingState) => result
//     )
// );

// const symbols = new Pairs({
//     t: "today",
//     h: "hours",
//     d: "days",
//     w: "weeks",
//     m: "months",
//     q: "quarters",
//     y: "years"
// });
//
// const timeZone = "Australia/Sydney";
//
// const now = () => moment(new Date(), timeZone);
//
// const today = () => now().startOf("day");
//
// const unwords = R.join(" ");
//
// const unchars = R.join("");
//
// const whitespaces = many(whitespace);
//
// const notWhitespaces = many1(anythingExcept(whitespace)).map(unchars);
//
// const words = sepBy1(whitespace)(notWhitespaces);
//
// console.log(words.run("")); // TODO: get this to fail for no input
//
// const sanitise = R.trim;
//
// const number = coroutine(function* () {
//     const p = {};
//
//     p.integer = [yield possibly(char("-")), yield digits];
//
//     p.fractional = yield possibly(sequenceOf([char("."), digits]));
//
//     return R.pipe(Object.values, R.flatten, parseInt)(p);
// });
//
// const optionalNumber = possibly(number);
//
// const unitSymbol = choice(symbols.keys.map(c => char(c)));
//
// const optionalUnitSymbol = possibly(unitSymbol);
//
// const ifNil = R.curry((b, a) => a || b);
//
// const error = s => {
//     throw new Error(s);
// };
//
// const surround = (b, a) => b + a + b;
//
// const exclamations = many(char("!"));
//
// const event = coroutine(function* () {
//     const importanceHead = yield exclamations;
//
//     const lead = yield optionalNumber.map(ifNil(1));
//
//     const unit = yield optionalUnitSymbol.map(ifNil(symbols.key("today")));
//
//     const duration = yield optionalNumber.map(ifNil(0));
//
//     const secondUnit = yield optionalUnitSymbol;
//
//     const importanceTail = yield exclamations;
//
//     const space = yield whitespaces;
//
//     const importance = R.sum(
//         [importanceHead, importanceTail].map(p => p.map(R.length))
//     );
//
//     const importanceFormat = R.curry(s => {
//         switch (importance) {
//             case 0:
//                 return s;
//                 break;
//             case 1:
//                 return s.toUpperCase();
//                 break;
//             case 2:
//             default:
//                 // TODO: use some function to incrementally wrap functions based on whether it satisfies the cases. e.g. surround(toUpper)
//                 return surround("!!!", s.toUpperCase());
//         }
//     });
//
//     const summary = yield words.map(unwords).map(importanceFormat);
//
//     console.log(`(${summary.length})`);
//
//     // const calcDate = ({ lead, unit, duration, secondUnit }) =>
//     //     R.cond([
//     //         [
//     //             R.equals(symbols.key("today")),
//     //             R.always(makeDateTimes({ lead: null, unit, duration: null }))
//     //         ],
//     //         [R.includes(R.__, symbols.keys), makeDateTimes],
//     //         [R.T, unit => error(`Invalid time/date unit in user input: ${unit}`)]
//     //     ])(unit);
//
//     const isTime = [unit, secondUnit].includes("h");
//
//     const momentAdd = (m, n, unit) => m.add(n, symbols.key(unit));
//
//     const start = momentAdd(isTime ? now() : today(), lead, unit);
//
//     const end = momentAdd(start, duration, secondUnit || unit);
//
//     const dateOrTime = `date${isTime ? "Time" : ""}`;
//
//     const dayFormat = "YYYY-MM-DD";
//
//     const hoursFormat = null;
//
//     const momentFormat = m => m.format(isTime ? hoursFormat : dayFormat);
//
//     const createDate = date => ({
//         [dateOrTime]: momentFormat(date),
//         timeZone
//     });
//
//     const date = R.map(createDate, { start, end });
//
//     return { summary, ...date };
// });
//
// const parser = R.pipe(sanitise, s =>
//     event.fork(
//         s,
//         (error, parsingState) => error,
//         (result, parsingState) => result
//     )
// );
