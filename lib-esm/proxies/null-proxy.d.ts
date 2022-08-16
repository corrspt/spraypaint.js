import { JsonapiResponseDoc } from "../jsonapi-spec";
import { IResultProxy } from "./index";
import { SpraypaintBase } from "../model";
export declare class NullProxy<T extends SpraypaintBase = SpraypaintBase> implements IResultProxy<T> {
    private _raw_json;
    constructor(raw_json: JsonapiResponseDoc);
    readonly raw: JsonapiResponseDoc;
    readonly data: null;
    readonly meta: Record<string, any>;
}
