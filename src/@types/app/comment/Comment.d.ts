type Operations =
  | "subtraction"
  | "addition"
  | "multiplication"
  | "division";
  
interface Comment {
  id: string;
  text: string;
  operation: Operations;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  publicationId: string;
  publication: Publication;
}

interface IComment {
  predecessorId?: string;
  text: string;
  userId: string;
  publicationId: string;
  operation: Operations;
}
