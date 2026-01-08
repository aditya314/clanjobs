import mongoose, { Model, Schema } from 'mongoose';
import ICollege from '@src/mongoDb/daoModels/entityModels/collegeModel/types';

const College: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  clanId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const CollegeModel: Model<ICollege> =
  mongoose.models.College || mongoose.model<ICollege>('College', College);
