import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './Router/route.js';

/** import connection file */
import connect from './Database/connection.js';

const app = express();

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

/** application port */
const port = process.env.PORT || 8080 ;

/**routes */
app.use('/api' , router)  /** API's */

app.get('/' , (req , res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

/** start server only when we have a valid connection */
connect().then(() => {
    try {
        app.listen(port , () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})

