import { Document, model, models, Schema } from "mongoose";

export interface IHistory extends Document {
  _id: string;
  user: string;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  created_at: Date;
}

const historySchema = new Schema<IHistory>({
  user: { type: String },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
  created_at: { type: Date, default: Date.now },
});

const History = models.History || model<IHistory>("History", historySchema);

export default History;
