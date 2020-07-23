import { ValidateableObject } from './validateableObject';

export type ListProperties<T extends ValidateableObject> = Omit<{[K in keyof T]: T[K]}, 'validateAsync'>;
