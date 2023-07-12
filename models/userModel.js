import mongoose from "mongoose";

// Create Collocation
const mySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create Model
const User = mongoose.model("User", mySchema);

// Export
export default User;
