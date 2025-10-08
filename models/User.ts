import mongoose, { Document, Model } from "mongoose";

// 🧱 1️⃣ Define the TypeScript interface for the User document
export interface IUser extends Document {
  name?: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 🧩 2️⃣ Create the Mongoose schema — defines the structure of data in MongoDB
const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  {
    timestamps: true, // ⏰ Automatically adds createdAt and updatedAt
  }
);

// 🧠 3️⃣ Fix: Check that mongoose.models exists before accessing .User
// Why? During hot reloads, mongoose.models can temporarily be undefined.
const existingModels = mongoose.models || {}; // ✅ ensures it’s at least an empty object

// 🧩 4️⃣ Create or reuse the User model safely
const User: Model<IUser> =
  (existingModels.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

// 🧾 5️⃣ Export so other files (like NextAuth or dbConnect) can use it
export default User;
