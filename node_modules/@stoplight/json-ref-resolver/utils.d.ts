import * as URI from 'urijs';
export declare const addToJSONPointer: (pointer: string, part: string) => string;
export declare const uriToJSONPointer: (uri: URI) => string;
export declare const uriIsJSONPointer: (ref: URI) => boolean;
