import mongoose, { Schema } from 'mongoose';

export interface FamilyUnitDoc extends mongoose.Document {
  _id: string;
  users: [];
  creationDate: Date;
}

const familyUnitSchema = new Schema(
  {
    users: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const FamilyUnitModel = mongoose.model<FamilyUnitDoc>(
  'FamilyUnit',
  familyUnitSchema
);
