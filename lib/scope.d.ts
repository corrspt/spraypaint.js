import { SpraypaintBase } from "./model";
import { IncludeArgHash } from "./util/include-directive";
import { CollectionProxy, RecordProxy, NullProxy } from "./proxies";
export interface JsonapiQueryParams {
    page: AnyRecord;
    filter: AnyRecord;
    sort: string[];
    fields: AnyRecord;
    extra_fields: AnyRecord;
    stats: AnyRecord;
    include?: string;
}
export declare type SortDir = "asc" | "desc";
export declare type SortScope = Record<string, SortDir>;
export declare type FieldScope = Record<string, string[]>;
export declare type FieldArg = FieldScope | string[];
export declare type WhereClause = any;
export declare type StatsScope = Record<string, string | string[]>;
export declare type IncludeScope = string | IncludeArgHash | (string | IncludeArgHash)[];
export declare type AnyRecord = Record<string, any>;
export interface Constructor<T> {
    new (...args: any[]): T;
}
export declare class Scope<T extends SpraypaintBase = SpraypaintBase> {
    model: typeof SpraypaintBase;
    private _associations;
    private _pagination;
    private _filter;
    private _sort;
    private _fields;
    private _extra_fields;
    private _include;
    private _stats;
    private _extraParams;
    private _extraFetchOptions;
    constructor(model: Constructor<T> | typeof SpraypaintBase);
    all(): Promise<CollectionProxy<T>>;
    find(id: string | number): Promise<RecordProxy<T>>;
    first(): Promise<RecordProxy<T> | NullProxy<T>>;
    merge(obj: Record<string, Scope>): Scope<T>;
    page(pageNumber: number): Scope<T>;
    per(size: number): Scope<T>;
    where(clause: WhereClause): Scope<T>;
    extraParams(clause: any): Scope<T>;
    stats(clause: StatsScope): Scope<T>;
    order(clause: SortScope | string): Scope<T>;
    select(clause: FieldArg): Scope<T>;
    selectExtra(clause: FieldArg): Scope<T>;
    includes(clause: IncludeScope): Scope<T>;
    extraFetchOptions(options: RequestInit): Scope<T>;
    scope(): Scope<T>;
    asQueryParams(): JsonapiQueryParams;
    toQueryParams(): string | undefined;
    fetchOptions(): RequestInit;
    copy(): Scope<T>;
    private _mergeAssociationQueryParams;
    private _transformAssociationSortParam;
    private _sortParam;
    private _fetch;
    private _buildRecordResult;
    private _buildCollectionResult;
    private _serverCasedWhereClause;
    private _serverCasedOrderClause;
    private _serverCasedFieldsClause;
    private _serverCasedIncludesClause;
    private _serverCasedStatsClause;
    private _serverCasedClause;
}
