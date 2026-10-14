import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then((conn) => {
      console.log("mongoose connected with ", conn.connection.host);
    })
    .catch((err) => console.log("mongoose connection erorr", err));
};

export default connectDB;
