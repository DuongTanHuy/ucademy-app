import { UserRole, UserStatus } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email_address: string;
  avatar: string;
  status: UserStatus;
  role: UserRole;
  courses: Schema.Types.ObjectId[];
  courseProgress: {
    courseId: string;
    progress: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true },
  username: { type: String, unique: true },
  email_address: { type: String, unique: true },
  avatar: { type: String },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  courses: { type: [Schema.Types.ObjectId], ref: "Course" },
  courseProgress: {
    type: [
      {
        courseId: Schema.Types.ObjectId,
        progress: { type: Number, default: 0 },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
