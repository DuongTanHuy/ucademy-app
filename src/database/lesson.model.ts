import { LessonType } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId; // kiểm tra khi có 2 khóa học có slug giống nhau (slug của khóa học có thể giống nhau)
  type: LessonType;
  order: number;
  duration: number;
  video_url: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  _destroy: boolean;
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  type: {
    type: String,
    enum: Object.values(LessonType),
    default: LessonType.VIDEO,
  },
  order: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  video_url: { type: String },
  content: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  _destroy: { type: Boolean, default: false },
});

const Lesson = models.Lesson || model<ILesson>("Lesson", lessonSchema);

export default Lesson;
