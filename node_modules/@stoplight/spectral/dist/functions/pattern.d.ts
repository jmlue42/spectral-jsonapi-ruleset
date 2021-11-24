import type { IFunction } from '../types';
export interface IRulePatternOptions {
    match?: string;
    notMatch?: string;
}
export declare const pattern: IFunction<IRulePatternOptions>;
