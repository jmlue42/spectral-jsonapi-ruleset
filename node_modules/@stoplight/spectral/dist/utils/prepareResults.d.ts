import { IRuleResult } from '../types';
export declare type ComputeFingerprintFunc = (rule: IRuleResult, hash: (val: string) => string) => string;
export declare const defaultComputeResultFingerprint: ComputeFingerprintFunc;
export declare const prepareResults: (results: IRuleResult[], computeFingerprint: ComputeFingerprintFunc) => IRuleResult[];
