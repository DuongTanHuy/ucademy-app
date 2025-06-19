import { UserRole, UserStatus } from "@/types/enums";
import { ObjectId, Collection, Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL as string;

class DatabaseService {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db("ucademy");
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  get users(): Collection<User> {
    return this.db.collection("users");
  }
}

const databaseService = new DatabaseService();
export default databaseService;

// -------------------------------------------------

interface UserType {
  _id?: ObjectId;
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  status?: UserStatus;
  role?: UserRole;
  courses?: ObjectId[];
  courseProgress?: {
    courseId: string;
    progress: number;
  }[];
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  _id?: ObjectId;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  status: UserStatus;
  role: UserRole;
  courses: ObjectId[];
  courseProgress: {
    courseId: string;
    progress: number;
  }[];
  created_at: Date;
  updated_at: Date;

  constructor(user: UserType) {
    const date = new Date();
    this._id = user._id;
    this.clerkId = user.clerkId;
    this.username = user.username;
    this.email = user.email;
    this.name = user.name || user.username;
    this.avatar = user.avatar || "";
    this.status = user.status || UserStatus.ACTIVE;
    this.role = user.role || UserRole.USER;
    this.courses = user.courses || [];
    this.courseProgress = user.courseProgress || [];
    this.created_at = user.created_at || date;
    this.updated_at = user.updated_at || date;
  }
}

// await databaseService.connect();

// await databaseService.users.insertOne(
//   new User({
//     clerkId: "clerkId",
//     username: "username",
//     email: "email@gmail.com",
//   })
// );
