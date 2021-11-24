export declare const isJSONSchema: (document: unknown) => document is (import("json-schema").JSONSchema4 & {
    $schema: string;
}) | (import("json-schema").JSONSchema6 & {
    $schema: string;
}) | (import("json-schema").JSONSchema7 & {
    $schema: string;
});
export declare const isJSONSchemaLoose: (document: unknown) => boolean;
export declare const isJSONSchemaDraft4: (document: unknown) => boolean;
export declare const isJSONSchemaDraft6: (document: unknown) => boolean;
export declare const isJSONSchemaDraft7: (document: unknown) => boolean;
export declare const isJSONSchemaDraft2019_09: (document: unknown) => boolean;
