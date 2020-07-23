import { ResponsePagination } from '@helpers/fps';

export const wrapper = (data: any) => ({ data: data });

export const wrapperWithPagination = (data: any, pagination: ResponsePagination) => ({ data: data, pagination });