import BusinessException from "./business.exception";

export default class AccessUtils {

    public static async getResponse(error) {
        console.error(error);
        let statusCode = 500;
        if (error instanceof Array || error instanceof BusinessException) {
            statusCode = 403;
        }
        const body = JSON.stringify(error.toJson ? error.toJson() : error);
        return {
            statusCode: statusCode,
            body: body,
            headers: AccessUtils.getCorsHeaders()
        };
    }

    public static getCorsHeaders() {
        return {
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true
        };
    }
}
