// import express from 'express';
// import { logger } from './middlewares/logger.middleware .js'
// import cors from 'cors';
// import userRouter from './routes/users.route.js'
// import coursesRouter from './routes/courses.route.js'
// const server=express()
// server.use(cors({  // ← הגדרות CORS מפורשות
//     origin: 'http://localhost:3000',  // או הפורט של React אצלך
//     credentials: true
// }))
// server.use(express.json())
// server.use(logger)
// server.use('/courses',coursesRouter)
// server.use('/users',userRouter)

// export default server
import express from 'express';
//import bodyParser from 'body-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import promptsRoute from './routes/prompts.route.js';
import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';
import jwt from 'jsonwebtoken'; 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/prompts', promptsRoute);
app.use('/users', userRoute);
app.use('/categories', categoryRoute);



app.get('/get-admin-token', (req, res) => {
  try {
    // The manager that needs to test admin routes can use this token.
    const token = jwt.sign(
      { id: '6a04a5338b63963a4b680dae', role: 'admin' }, 
      process.env.JWT_SECRET || '123456', 
      { expiresIn: '365d' }
    );
    res.send(token);
  } catch (error) {
    res.status(500).send("Error generating token: " + error.message);
  }
});

export default app;