import { Schema } from 'mongoose';
// import * as bcrypt from 'bcrypt';

// export const UserSchema = new Schema({
//   password: String,
// });

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this['password'] = await bcrypt.hash(this['password'], 10);
//   }
//   next();
// });

// UserSchema.methods.comparePassword = async function (
//   password: string,
// ): Promise<boolean> {
//   return bcrypt.compare(password, this['password']);
// };

export const UserSchema = new Schema({
  password: { type: String, required: true },
});
