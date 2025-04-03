export function skip(page: string, limit: string): number {
 
 
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  return (pageNumber - 1) * limitNumber;
}

export function prismaPagination(
  page: string,
  limit: string
): { take: number; skip: number } {
  return {
    take: Number(limit),
    skip: skip(page, limit),
  };
}
