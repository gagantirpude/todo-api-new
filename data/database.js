import mongoose from "mongoose";

//Connection
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "todo",
    })
    .then((c) => console.log(`Database Host is :- ${c.connection.host}`))
    .catch((error) => console.log(error));
};

//export
export default connectDB;
