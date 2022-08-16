import { SpraypaintBase } from "../model";
import { JsonapiResponseDoc } from "../jsonapi-spec";
export declare class ValidationErrorBuilder<T extends SpraypaintBase> {
    static apply<T extends SpraypaintBase>(model: T, payload: JsonapiResponseDoc): void;
    model: T;
    payload: JsonapiResponseDoc;
    constructor(model: T, payload: JsonapiResponseDoc);
    apply(): void;
    private _processResource;
    private _processRelationship;
}
