import { MiddlewareStack } from "./middleware-stack";
import { ILogger } from "./logger";
import { JsonapiResponseDoc, JsonapiRequestDoc } from "./jsonapi-spec";
export declare type RequestVerbs = keyof Request;
export interface JsonapiResponse extends Response {
    jsonPayload: JsonapiResponseDoc;
}
export interface RequestConfig {
    patchAsPost: boolean;
}
export declare class Request {
    middleware: MiddlewareStack;
    config: RequestConfig;
    private logger;
    constructor(middleware: MiddlewareStack, logger: ILogger, config?: RequestConfig);
    get(url: string, options: RequestInit): Promise<any>;
    post(url: string, payload: JsonapiRequestDoc, options: RequestInit): Promise<any>;
    patch(url: string, payload: JsonapiRequestDoc, options: RequestInit): Promise<any>;
    delete(url: string, options: RequestInit): Promise<any>;
    private _logRequest;
    private _logResponse;
    private _fetchWithLogging;
    private _fetch;
    private _handleResponse;
}
export declare class ResponseError extends Error {
    response: Response | null;
    originalError: Error | undefined;
    constructor(response: Response | null, message?: string, originalError?: Error);
}
