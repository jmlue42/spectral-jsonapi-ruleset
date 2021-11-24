import { IFunction } from '../types';
export declare enum CasingType {
    flat = "flat",
    camel = "camel",
    pascal = "pascal",
    kebab = "kebab",
    cobol = "cobol",
    snake = "snake",
    macro = "macro"
}
export interface ICasingOptions {
    type: CasingType;
    disallowDigits?: boolean;
    separator?: {
        char: string;
        allowLeading?: boolean;
    };
}
export declare const casing: IFunction<ICasingOptions>;
