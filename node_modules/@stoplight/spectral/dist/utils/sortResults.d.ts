import { IPosition } from '@stoplight/types';
import { IRuleResult } from '../types';
export declare const comparePosition: (left: IPosition, right: IPosition) => -1 | 0 | 1;
export declare const compareResults: (left: IRuleResult, right: IRuleResult) => -1 | 0 | 1;
export declare const sortResults: (results: IRuleResult[]) => IRuleResult[];
