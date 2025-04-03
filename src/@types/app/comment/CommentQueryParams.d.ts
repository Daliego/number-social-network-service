import { Pagination } from "@/helpers/types/pagination";

interface CommentQueryParams extends Pagination {
  publicationId?: string;
  email?: string;
  userId?: string;
  id?: string;
  typeId?: string;
}
