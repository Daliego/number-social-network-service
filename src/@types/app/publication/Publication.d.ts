interface Publication {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  comment: Comment[];
}

interface IPublication {
  title: string;
  text: string;
  userId: string;
}