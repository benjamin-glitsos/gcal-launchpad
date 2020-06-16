import { cond, isEqual } from "~/lib/utilities";

export const sagaReducer = ({ message, data, ifSend, ifSuccess, ifFailure, ifElse }) => {
    return cond([
        {
            case: isEqual(process.env.messages.SEND),
            return: ifSend
        }
        {
            case: isEqual(process.env.messages.SUCCESS),
            return: ifSuccess
        },
        {
            case: isEqual(process.env.messages.FAILURE),
            return: ifFailure
        },
        {
            case: true,
            return: ifElse
        }
    ])(message);
}
