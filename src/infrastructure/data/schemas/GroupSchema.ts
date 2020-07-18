import mongoose, { Schema } from 'mongoose';

export interface GroupDoc extends mongoose.Document {
  _id: string;
  owner: string;
  users: [];
  creationDate: Date;
}

const familyUnitSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const GroupModel = mongoose.model<GroupDoc>('Group', familyUnitSchema);
