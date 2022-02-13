export interface IErrResponse {
    message: [{
        msg: string,
        param: string
    }] | string
}

const getServerError = (errResponse: IErrResponse): string => {
    let errText = "";

    if (Array.isArray(errResponse.message)) {
        for (const err of errResponse.message) {
            errText += err.msg + " " + err.param + " ";
        }
    } else {
        errText = errResponse.message;
    }

    return errText || "Some error";
}

export default getServerError;