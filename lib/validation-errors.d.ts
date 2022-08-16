import { Omit } from "./util/omit";
import { SpraypaintBase } from "./model";
export interface IValidationError<T extends SpraypaintBase> {
    code: string;
    attribute: keyof ValidationErrors<T>;
    title: string;
    message: string;
    fullMessage: string;
    rawPayload: Record<string, any>;
}
export declare class ValidationError<T extends SpraypaintBase> implements IValidationError<T> {
    code: string;
    attribute: keyof ValidationErrors<T>;
    title: string;
    message: string;
    fullMessage: string;
    rawPayload: Record<string, any>;
    constructor(options: IValidationError<T>);
}
export declare type ValidationErrors<T extends SpraypaintBase> = ErrorAttrs<T, keyof (Omit<T, keyof SpraypaintBase>)>;
export declare type ErrorAttrs<T extends SpraypaintBase, K extends keyof T> = {
    [P in K]?: IValidationError<T> | undefined;
} & {
    base?: IValidationError<T>;
    [key: string]: IValidationError<T> | undefined;
};
