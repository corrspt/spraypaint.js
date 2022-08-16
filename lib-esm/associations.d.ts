import { Attribute, AttrRecord, Attr } from "./attribute";
import { SpraypaintBase } from "./model";
import { JsonapiTypeRegistry } from "./jsonapi-type-registry";
export interface AssociationRecord<T extends SpraypaintBase> extends AttrRecord<T> {
    type?: Attr<T>;
    jsonapiType?: string;
}
export interface Association {
    isRelationship: true;
    readonly klass: typeof SpraypaintBase;
    jsonapiType: string;
}
export declare class SingleAssociationBase<T extends SpraypaintBase> extends Attribute<T> implements Association {
    isRelationship: true;
    jsonapiType: string;
    typeRegistry: JsonapiTypeRegistry;
    private _klass;
    constructor(options: AssociationRecord<T>);
    readonly klass: typeof SpraypaintBase;
    getter(context: SpraypaintBase): SpraypaintBase | SpraypaintBase[];
    setter(context: SpraypaintBase, val: any): void;
}
export declare class HasMany<T extends SpraypaintBase> extends Attribute<T[]> implements Association {
    isRelationship: true;
    jsonapiType: string;
    typeRegistry: JsonapiTypeRegistry;
    private _klass;
    constructor(options: AssociationRecord<T>);
    readonly klass: typeof SpraypaintBase;
    getter(context: SpraypaintBase): SpraypaintBase | SpraypaintBase[];
    setter(context: SpraypaintBase, val: any): void;
}
export declare class HasOne<T extends SpraypaintBase> extends SingleAssociationBase<T> {
}
export declare class BelongsTo<T extends SpraypaintBase> extends SingleAssociationBase<T> {
}
export interface AssociationFactoryOpts<T extends SpraypaintBase> {
    type?: string | Attr<T>;
    persist?: boolean;
    name?: string;
}
export declare type AssociationFactoryArgs<T extends SpraypaintBase> = AssociationFactoryOpts<T> | string;
export declare const hasOne: <T extends SpraypaintBase>(options?: AssociationFactoryOpts<T> | undefined) => HasOne<T>;
export declare const belongsTo: <T extends SpraypaintBase>(options?: string | AssociationFactoryOpts<T> | undefined) => BelongsTo<T>;
export declare const hasMany: <T extends SpraypaintBase>(options?: string | AssociationFactoryOpts<T> | undefined) => HasMany<T>;
