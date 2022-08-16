import { JsonapiTypeRegistry } from "../jsonapi-type-registry";
import { SpraypaintBase } from "../model";
import { IncludeScopeHash } from "./include-directive";
import { JsonapiResource, JsonapiResponseDoc } from "../jsonapi-spec";
declare const deserialize: (registry: JsonapiTypeRegistry, datum: JsonapiResource, payload: JsonapiResponseDoc) => SpraypaintBase;
declare const deserializeInstance: (instance: SpraypaintBase, resource: JsonapiResource, payload: JsonapiResponseDoc, includeDirective?: IncludeScopeHash) => SpraypaintBase;
export { deserialize, deserializeInstance };
