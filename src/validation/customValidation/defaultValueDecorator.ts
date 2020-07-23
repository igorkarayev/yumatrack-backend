import { Transform } from 'class-transformer';

export function DefaultValueDecorator(defaultValue: any) {
  return Transform((target: any) => target || defaultValue);
}
