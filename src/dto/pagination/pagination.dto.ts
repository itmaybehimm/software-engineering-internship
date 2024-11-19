import { Request } from 'express';

export interface PaginationParams {
  page: number;
  size: number;
}

export const getPaginationParams = (req: Request): PaginationParams => {
  // Extract page and size from query parameters
  const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
  const size = parseInt(req.query.size as string, 10) || 20; // Default to 20 items per page

  return {
    page,
    size,
  };
};
