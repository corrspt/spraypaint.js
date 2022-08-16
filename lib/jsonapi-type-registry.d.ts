import { SpraypaintBase } from "./model";
export declare class JsonapiTypeRegistry {
    private _typeMap;
    private _baseClass;
    constructor(base: typeof SpraypaintBase);
    register(type: string, model: typeof SpraypaintBase): void;
    get(type: string): typeof SpraypaintBase | undefined;
}
