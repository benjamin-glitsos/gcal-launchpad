import { cond, isEqual } from "~/lib/utilities";

export const sagaReducer = ({ message, data, onSend, onSuccess, onFailure, onOtherwise }) => {
    return cond([
        {
            case: isEqual(process.env.messages.SEND),
            return: onSend
        }
        {
            case: isEqual(process.env.messages.SUCCESS),
            return: onSuccess
        },
        {
            case: isEqual(process.env.messages.FAILURE),
            return: onFailure
        },
        {
            case: true,
            return: onOtherwise
        }
    ])(message);
}
