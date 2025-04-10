import { UserRole, UserStatus } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  status: UserStatus;
  role: UserRole;
  courses: Schema.Types.ObjectId[];
  courseProgress: {
    courseId: string;
    progress: number;
  }[];
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true },
  name: { type: String },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
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
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
