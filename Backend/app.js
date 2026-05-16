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
      process.env.JWT_SECRET , 
      { expiresIn: '365d' }
    );
    res.send(token);
  } catch (error) {
    res.status(500).send("Error generating token: " + error.message);
  }
});

export default app;