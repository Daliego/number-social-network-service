interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User; 
  publicationId: string;
  publication: Publication; 
}


interface IComment {
  text: string;
  userId: string;
  publicationId: string;
}