export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, K> = {
    [P in Diff<Extract<keyof T, string>, Extract<keyof K, string>>]: T[P];
};
