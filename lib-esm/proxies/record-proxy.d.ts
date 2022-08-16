import { SpraypaintBase } from "../model";
import { IResultProxy } from "./index";
import { JsonapiResponseDoc } from "../jsonapi-spec";
import { PersistedSpraypaintRecord } from "../model";
export declare class RecordProxy<T extends SpraypaintBase> implements IResultProxy<T> {
    private _raw_json;
    private _record;
    constructor(record: PersistedSpraypaintRecord<T>, raw_json: JsonapiResponseDoc);
    readonly raw: JsonapiResponseDoc;
    readonly data: PersistedSpraypaintRecord<T>;
    readonly meta: Record<string, any>;
}
