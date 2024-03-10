import mongoose from "./connection.js";

var userModel = new mongoose.Schema({
    name: String,
    email: { type: String},
    password: String,
    phone: String,
  });
  
  
  export default mongoose.model('User', userModel,'User');