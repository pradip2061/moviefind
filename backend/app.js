const express = require('express');
const app = express();
const connectToDatabase = require('./database/index');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const userRouter = require('./router/userRouter');
require('dotenv').config();

app.use(express.static('./storage'));

app.use(cors({
    origin: ['http://localhost:5173', 'https://moviefind-o61pg5yyw-pradip2061s-projects.vercel.app'],
    credentials: true
}));

app.use(cookieparser());
app.use(express.json());

connectToDatabase();

app.use('/movie', userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`The project is running at port ${PORT}`);
});
