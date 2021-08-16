import mongoose, { Schema, Document } from 'mongoose';

interface UserSchema {
  name: string;
  createdAt?: Date;
}
export interface UserDocument extends Document, UserSchema {}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'user' }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default {
  find: async (query: Record<string, unknown>): Promise<UserDocument | null> =>
    new Promise((res, rej) => {
      UserModel.findOne(query).exec((err, doc) => {
        if (err) {
          return rej(err);
        }
        res(doc);
      });
    }),
  findList: async (): Promise<UserDocument[]> =>
    new Promise((res, rej) => {
      UserModel.find().exec((err, docs) => {
        if (err) {
          rej(err);
        }
        res(docs);
      });
    }),
  create: async (user: { name: string }): Promise<UserDocument> =>
    new Promise((res, rej) => {
      if (!user || !user.name) {
        return rej(new Error());
      }
      const newUser = new UserModel({
        name: user.name,
      });
      newUser.save((err, doc) => {
        if (err) {
          rej(err);
        }
        res(doc);
      });
    }),
};
