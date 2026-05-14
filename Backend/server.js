import server from './app.js';
import  connectDB  from './config/db.js';
import dotenv from 'dotenv';


dotenv.config();
//Connect to MongoDB and start the server

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();