import { PaginationQuery } from '@validation/requests/paginationQuery';
import { trim } from '@helpers/trim';

export interface ResponsePagination {
  currentPage: number;
  totalPage: number;
  totalRecord: number;
  limit: number;
}

function generateSortField(field: any): any {
  const sortField = {};

  if (field[0] === '-') {
    field = field.slice(1);
    sortField[field[0].toUpperCase() + field.slice(1)] = 'DESC';
  } else {
    sortField[field[0].toUpperCase() + field.slice(1)] = 'ASC';
  }
  return sortField;
}

export function generateSorting(sortingQuery: any): any {
  let sorting = {};

  if (!sortingQuery.sort) {
    return sorting;
  }

  const sort = trim(sortingQuery.sort);

  if (sort.includes(',')) {
    sorting = sort.split(',').reduce((acc: any, it: string) => {
      return {
        ...acc,
        ...generateSortField(it),
      };
    }, {});
  } else {
    sorting = generateSortField(sort);
  }

  return sorting;
}

export function generatePagination(paginationQuery: PaginationQuery): any {
  const { limit, page } = paginationQuery;
  return {
    limit: Number(limit),
    offset: (Number(limit) * Number(page)) - Number(limit),
  };
}

export function generateResponsePagination(limit: number, page: number, count: number): ResponsePagination {
  return {
    currentPage: Number(page),
    totalPage: Math.ceil(count / limit),
    totalRecord: Number(count),
    limit: Number(limit),
  };
}