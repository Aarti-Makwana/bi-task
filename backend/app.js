import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import chatRouter from './Router/chatRouter.js';
import userRouter from './Router/userRouter.js';
import messageRouter from './Router/messageRouter.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Register route
app.use("/user",userRouter);
app.use('/chat',chatRouter);
app.use("/message",messageRouter);


app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

