type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ICommonFetch = <T extends { [key: string]: number | string }>(method: IMethod, url: string, parameter: T) => Promise<{ headers: Headers, text: string } | number>
export const commonFetch: ICommonFetch = async (method, url = '', parameter) => {
    let requestUrl = '';
    if (method == 'GET') {
        let parameterStr = '?';
        if (parameter) {
            for (const key in parameter) {
                if (parameter.hasOwnProperty(key)) {
                    parameterStr += (key + '=' + parameter[key] + '&');
                }
            }
        }
        parameterStr = parameterStr.substr(0, parameterStr.length - 1);
        requestUrl = url + parameterStr;
    } else {
        requestUrl = url;
    }
    const requestInit: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' }
    }
    if (method != 'GET') {
        requestInit.body = JSON.stringify(parameter);
    }

    const response: Response = await fetch(requestUrl, requestInit)
    if (response.status >= 200 && response.status < 300) {
        const headers = response.headers;
        const text = await response.text();
        return {
            headers,
            text
        };
    } else {
        return response.status;
    }
};
