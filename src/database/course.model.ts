import { CourseLevel, CourseStatus } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string;
  image: string;
  intro_url: string;
  desc: string;
  price: number;
  sale_price: number;
  slug: string;
  status: CourseStatus;
  author: Schema.Types.ObjectId;
  level: CourseLevel;
  views: number;
  rating: number[];
  info: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
  _destroy: boolean;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  image: { type: String },
  intro_url: { type: String },
  desc: { type: String },
  price: { type: Number },
  sale_price: { type: Number },
  slug: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.PENDING,
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  level: { type: String, enum: Object.values(CourseLevel) },
  views: { type: Number, default: 0 },
  rating: { type: [Number], default: [5] },
  info: {
    requirements: { type: [String] },
    benefits: { type: [String] },
    qa: {
      type: [
        {
          question: { type: String },
          answer: { type: String },
        },
      ],
    },
  },
  lectures: { type: [Schema.Types.ObjectId], ref: "Lecture" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  _destroy: { type: Boolean, default: false },
});

const Course = models.Course || model<ICourse>("Course", courseSchema);

export default Course;
