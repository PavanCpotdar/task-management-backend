const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const todoRoutes = require('./routes/todo.router')
const authMiddleware = require('./middleware/auth.middleware');
const cookiesParser = require('cookie-parser');
const helmet = require("helmet");
require("dotenv").config();
const { testDBConnection } = require('./config/db');

const app = express();
app.use(helmet());
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');
app.use(cors({
  origin: allowedOrigins || ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookiesParser());
app.use('/api/auth', authRoutes);
app.use(authMiddleware);
app.use('/api/user', userRoutes);
app.use('/api/todos', todoRoutes);



app.listen(5000, async () => {

  console.log(`🚀 Server running on port ${5000}`);

  await testDBConnection();

});
