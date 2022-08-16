import { SpraypaintBase, ModelConfiguration } from "./model";
import { AttributeOptions } from "./attribute";
import { AssociationFactoryOpts } from "./associations";
export declare type DecoratorPlacement = "static" | "prototype" | "own";
export interface EcmaDecoratorDescriptor {
    kind: "class" | "method" | "field";
    key: string;
    placement: DecoratorPlacement;
}
export interface FieldDecoratorDescriptor extends EcmaDecoratorDescriptor {
    kind: "field";
}
declare type ModelDecorator = <M extends typeof SpraypaintBase>(target: M) => M;
declare const ModelDecorator: (config?: Partial<ModelConfiguration> | undefined) => ModelDecorator;
export declare const initModel: (modelClass: typeof SpraypaintBase, config?: Partial<ModelConfiguration> | undefined) => void;
declare const AttrDecoratorFactory: {
    (config?: AttributeOptions): PropertyDecorator;
    (target: SpraypaintBase, propertyKey: string): void;
    (target: typeof SpraypaintBase, propertyKey: string, config?: AttributeOptions): void;
    (fieldDetails: FieldDecoratorDescriptor): void;
};
declare const LinkDecoratorFactory: (fieldDetail?: FieldDecoratorDescriptor | undefined) => any;
declare type DecoratorFn = (target: SpraypaintBase, propertyKey: string) => void;
declare const HasManyDecoratorFactory: {
    (optsOrType?: string | typeof SpraypaintBase | AssociationFactoryOpts<SpraypaintBase> | undefined): DecoratorFn;
    (target: typeof SpraypaintBase, propertyKey: string, optsOrType?: string | AssociationFactoryOpts<SpraypaintBase> | undefined): DecoratorFn;
    (decoratorDescriptor: FieldDecoratorDescriptor): FieldDecoratorDescriptor;
};
declare const HasOneDecoratorFactory: {
    (optsOrType?: string | typeof SpraypaintBase | AssociationFactoryOpts<SpraypaintBase> | undefined): DecoratorFn;
    (target: typeof SpraypaintBase, propertyKey: string, optsOrType?: string | AssociationFactoryOpts<SpraypaintBase> | undefined): DecoratorFn;
    (decoratorDescriptor: FieldDecoratorDescriptor): FieldDecoratorDescriptor;
};
declare const BelongsToDecoratorFactory: {
    (optsOrType?: string | typeof SpraypaintBase | AssociationFactoryOpts<SpraypaintBase> | undefined): DecoratorFn;
    (target: typeof SpraypaintBase, propertyKey: string, optsOrType?: string | AssociationFactoryOpts<SpraypaintBase> | undefined): DecoratorFn;
    (decoratorDescriptor: FieldDecoratorDescriptor): FieldDecoratorDescriptor;
};
export { ModelDecorator as Model, AttrDecoratorFactory as Attr, LinkDecoratorFactory as Link, HasManyDecoratorFactory as HasMany, HasOneDecoratorFactory as HasOne, BelongsToDecoratorFactory as BelongsTo };
