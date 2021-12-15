export interface IErrResponse {
    message: [{
        msg: string,
        param: string
    }]
}

const getServerError = (errResponse: IErrResponse): string => {
    let errText = "";

    for (const err of errResponse.message) {
        errText += err.msg + " " + err.param + " ";
    }

    return errText || "Some error";
}

export default getServerError;