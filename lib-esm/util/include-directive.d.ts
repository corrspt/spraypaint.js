import { IncludeScope } from "../scope";
export interface IncludeArgHash {
    [key: string]: IncludeScope;
}
export interface IncludeScopeHash {
    [key: string]: IncludeScopeHash;
}
export declare class IncludeDirective {
    private dct;
    constructor(arg?: IncludeScope);
    toScopeObject(): IncludeScopeHash;
    toString(): string;
    private _parseIncludeArgs;
    private _parseObject;
    private _parseArray;
}
