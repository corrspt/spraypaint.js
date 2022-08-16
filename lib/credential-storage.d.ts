export interface StorageBackend {
    getItem(key: string): string | null;
    setItem(key: string, value: string | null | undefined): void;
    removeItem(key: string): void;
}
export declare class InMemoryStorageBackend implements StorageBackend {
    private _data;
    constructor();
    getItem(key: string): string | null;
    setItem(key: string, value: string | undefined): void;
    removeItem(key: string): void;
}
export declare class CredentialStorage {
    private _jwtKey;
    private _backend;
    constructor(jwtKey: string, backend?: StorageBackend);
    readonly backend: StorageBackend;
    getJWT(): string | undefined;
    setJWT(value: string | undefined | null): void;
}
