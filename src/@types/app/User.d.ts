export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  refreshToken?: string;
  role: "USER" | "ADMIN";
  emailVerified?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  publications?: Publication[];
  comments?: Comment[];
}
