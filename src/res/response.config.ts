import { ResponseInterface } from './response.interface';
import { ResponseAbstract } from './response.adstract';

export class ResponseHandler extends ResponseAbstract {
    // 200 OK
    override responseOK(payload?: object, message?: string): ResponseInterface {
        return {
            statusCode: 200,
            message: message || 'success',
            timestamp: new Date().toISOString(),
            payload,
        };
    }

    // 201 Created
    override responseCreated(payload?: object, message?: string): ResponseInterface {
        return {
            statusCode: 201,
            message: message || 'success',
            timestamp: new Date().toISOString(),
            payload,
        };
    }

    // 204 No Content
    override responseNoContent(message?: string): ResponseInterface {
        return {
            statusCode: 204,
            message: message || 'success',
            timestamp: new Date().toISOString(),
        };
    }

    // 400 Bad Request
    responseBadRequest(message?: string, payload?: object): ResponseInterface {
        return {
            statusCode: 400,
            message: `failed: ${message || 'bad request'}`,
            timestamp: new Date().toISOString(),
        };
    }

    // 401 Unauthorized
    responseUnauthorized(message?: string): ResponseInterface {
        return {
            statusCode: 401,
            message: `failed: ${message || 'unauthorized'}`,
            timestamp: new Date().toISOString(),
        };
    }

    // 403 Forbidden
    responseForbidden(message?: string): ResponseInterface {
        return {
            statusCode: 403,
            message: `failed: ${message || 'forbidden'}`,
            timestamp: new Date().toISOString(),
        };
    }

    // 405 Method Not Allowed
    responseMethodNotAllowed(message?: string): ResponseInterface {
        return {
            statusCode: 403,
            message: `failed: ${message || 'method not allowed'}`,
            timestamp: new Date().toISOString(),
        };
    }

    // 409 Conflict
    responseConflict(message?: string): ResponseInterface {
        return {
            statusCode: 409,
            message: `failed: ${message || 'conflict'}`,
            timestamp: new Date().toISOString(),
        };
    }
}
