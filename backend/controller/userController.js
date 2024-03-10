import userModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
export const userRegistrationController = async(req,res)=>{
  console.log(req.body,"user registration")
  try {
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

 var duplicateEmail = await userModel.findOne({email:email});
  console.log("data : ",duplicateEmail);
   if(duplicateEmail){
    res.status(203).json({ success: false, message: 'User already registere' });
   }
   else{
    const newUser = new userModel({ name, email, password: hashedPassword, phone });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
   }
  
} catch (error) {
  console.log("eror ",error);
  res.status(500).json({ success: false, message: 'Error registering user' });
}
}

export const userLoginController = async(req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
}

export const showUserController = async(req,res)=>{
  try {
    console.log("showuser controller running ");
    const userData = await userModel.find();
    console.log(userData,"userData-----");
    res.status(200).json(userData); 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error in show data' });
  }
}