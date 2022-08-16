import { SpraypaintBase } from "./model";
export declare type Attr<T> = (() => T) | {
    new (...args: any[]): T & object;
};
export declare type AttrType<T> = Attr<T>;
export declare type DirtyChecker<T> = (prior: T, current: T) => boolean;
export interface AttrRecord<T> {
    name?: string;
    type?: AttrType<T>;
    persist?: boolean;
    dirtyChecker?: DirtyChecker<T>;
}
export declare const attr: <T = any>(options?: AttrRecord<T> | undefined) => Attribute<T>;
export declare type AttributeValue<Attributes> = {
    [K in keyof Attributes]: Attributes[K];
};
export declare type AttributeOptions = Partial<{
    name: string;
    type: () => any;
    persist: boolean;
    dirtyChecker?: DirtyChecker<any>;
}>;
export declare const STRICT_EQUALITY_DIRTY_CHECKER: DirtyChecker<any>;
export declare class Attribute<T = any> {
    isRelationship: boolean;
    name: string;
    type?: T;
    persist: boolean;
    dirtyChecker: DirtyChecker<T>;
    owner: typeof SpraypaintBase;
    constructor(options: AttrRecord<T>);
    apply(ModelClass: typeof SpraypaintBase): void;
    setter(context: SpraypaintBase, val: any): void;
    getter(context: SpraypaintBase): any;
    descriptor(): PropertyDescriptor;
}
